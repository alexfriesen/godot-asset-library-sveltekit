import { error, redirect, type Actions } from '@sveltejs/kit';
import { object, string, ValidationError } from 'yup';
import type { PageServerLoad } from './$types';

import { db } from '$lib/database';
import { sendInvaldidErrors } from '$lib/form';

const schema = object({
	username: string(),
	full_name: string(),
})
	.noUnknown();

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401)
	}

	// throw redirect(302, `/user/${locals.user.id}`);
};

export const actions: Actions = {
	update: async ({ request, locals }) => {

		const user = locals.user;
		if (!user) {
			throw error(401)
		}

		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		try {
			await schema.validate(rawData, { abortEarly: false });
		} catch (validationError: ValidationError | any) {
			return sendInvaldidErrors(validationError);
		}

		await db.user.update({
			where: { id: user.id },
			data: {
				...schema.cast(rawData),
			}
		});

		return {
			location: `/user/${user.id}`
		};
	}
};
