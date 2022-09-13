import type { Handle, } from '@sveltejs/kit';
import { getUserById } from '$lib/database';
import { AUTH_COOKIE_NAME, verifyToken } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get(AUTH_COOKIE_NAME);

	if (!authToken) {
		return await resolve(event);
	}

	try {
		const payload = await verifyToken(authToken);
		const user = await getUserById(payload?.id);

		if (user) {
			event.locals.user = user;
		}
	} catch (error) {
		console.error(error);
		event.cookies.delete(AUTH_COOKIE_NAME);
	}

	return await resolve(event);
};
