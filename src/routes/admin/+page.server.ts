import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { canBlockUser, isAdmin } from '../../lib/permissions';
import { error, type Actions } from '@sveltejs/kit';
import { boolean } from 'yup';

export const load: PageServerLoad = async ({ locals }) => {
	if (!isAdmin(locals.user)) {
		throw error(403, 'Forbidden');
	}

	const totalUsers = await db.user.count();
	const users = await db.user.findMany({
		// orderBy,
		include: {
			assets: true,
			reviews: true
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

export const actions: Actions = {
	'user-block': async ({ request, locals }) => {
		const currentUser = locals.user;
		if (!currentUser) {
			throw error(401)
		}

		const formData = await request.formData();
		const userId = Number(formData.get('userId'));
		const is_blocked = boolean().cast(formData.get('is_blocked'));

		const user = await db.user.findUnique({ where: { id: userId } });

		if (canBlockUser(currentUser, user)) {
			await db.user.update({ where: { id: userId }, data: { is_blocked } })
		}
	}
}