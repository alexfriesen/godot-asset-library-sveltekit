import type { Handle, } from '@sveltejs/kit';
import * as cookie from 'cookie';

import { getUserById } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	if (!cookies.session) {
		// return await resolve(event);
	}

	// TODO: token based auth
	const user = await getUserById(1);

	if (user) {
		event.locals.user = user
	}

	return await resolve(event)
};
