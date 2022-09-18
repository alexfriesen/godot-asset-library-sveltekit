import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AUTH_COOKIE_NAME } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
};

export const actions: Actions = {
    default: async ({ cookies }) => {
        cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
    }
};
