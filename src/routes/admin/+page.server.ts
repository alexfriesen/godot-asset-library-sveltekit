import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { isAdmin } from '../../lib/permissions';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!isAdmin(locals.user)) {
		throw error(403, 'Forbidden');
	}

	const totalUsers = await db.user.count();
	const users = await db.user.findMany({
		// orderBy,
		include: {
			assets: true,
			asset_reviews: true
		},
	});

	if (users) {
		return {
			users,
			totalUsers,
		};
	}

	return {
		users: [],
		totalUsers: 0,
	};
};