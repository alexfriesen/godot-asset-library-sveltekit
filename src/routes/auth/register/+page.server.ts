import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { object, string } from 'yup';
import { db } from '$lib/database';
import { parseFormdata, sendInvaldidErrors } from '$lib/form';
import type { PageServerLoad } from './$types';
import { AUTH_COOKIE_NAME, encryptPassword, signToken } from '../../../lib/auth';

const schema = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required(),
})
    .noUnknown()
    .strict();

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

        const user = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: encryptPassword(data.password),
            }
        });

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