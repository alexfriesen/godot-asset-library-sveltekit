import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { object, string } from 'yup';
import { db } from '$lib/database';
import { parseFormdata, sendInvaldidErrors } from '$lib/form';
import { AUTH_COOKIE_NAME, encryptPassword, signToken } from '$lib/auth';
import type { PageServerLoad } from './$types';

const schema = object({
    email: string().email().required(),
    password: string().required(),
})
    .noUnknown();

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/');
    }
};

export const actions: Actions = {
    default: async ({ cookies, request }) => {

        const rawData = parseFormdata(await request.formData());

        try {
            await schema.validate(rawData, { abortEarly: false });
        } catch (validationError: any) {
            return sendInvaldidErrors(validationError);
        }

        const data = schema.cast(rawData);

        const user = await db.user.findUnique({ where: { email: data.email } });

        if (!user) {
            return invalid(400, { email: 'unknown user' });
        }
        if (user.is_blocked) {
            return invalid(400, { email: 'User is blocked' });
        }
        if (user.password !== encryptPassword(data.password!)) {
            return invalid(400, { password: 'incorrect' });
        }

        const payload = {
            id: `${user.id}`, // json.stringify will break with BigInt
            email: user.email
        };
        const token = signToken(payload);

        // TODO: add refresh token workflow
        // await db.user.update({ where: { id: user.id }, data: { remember_token: token } });
        cookies.set(AUTH_COOKIE_NAME, token, { path: '/' });

        return { user: payload };
    }
}