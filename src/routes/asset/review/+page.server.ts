import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
    throw redirect(301, `/`);
}