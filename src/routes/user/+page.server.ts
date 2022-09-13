import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const currentUser = locals.user;

	if (currentUser) {
		throw redirect(302, `/user/${currentUser.id}`);
	}

	throw redirect(301, `/`);
};
