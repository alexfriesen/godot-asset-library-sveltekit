import type { Handle, } from '@sveltejs/kit';
import { getUserById } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('auth');

	if (!authToken) {
		// return await resolve(event);
	}

	// TODO: token based auth
	const user = await getUserById(1);

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
