import type { PageServerLoad, Action } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { object, string, ValidationError } from 'yup';

import { db } from '$lib/database';

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

export const PATCH: Action = async ({ request, locals }) => {

	const user = locals.user;
	if (!user) {
		throw error(401)
	}

	const formData = await request.formData();
	const rawData = Object.fromEntries(formData);

	try {
		await schema.validate(rawData);
	} catch (errors) {
		return {
			errors,
		}
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
};

export const DELETE: Action = async ({ request, locals }) => {
	// TODO!
};