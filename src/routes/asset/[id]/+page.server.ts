import { error } from '@sveltejs/kit';

import type { Action, PageServerLoad } from './$types';
import { canEditAsset, canViewAsset } from '$lib/permissions';
import { db } from '$lib/database';
import { boolean, object, string } from 'yup';

const patchSchema = object({
	title: string(),
	is_published: boolean(),
	is_archived: boolean(),
});

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals, params }) => {
	const asset_id = Number(params.id);

	if (asset_id) {
		const asset = await db.asset.findUnique({
			where: { asset_id },
			include: {
				asset_versions: true,
				asset_previews: true,
				asset_reviews: {
					include: {
						user: {
							select: {
								id: true,
								username: true,
							}
						},
						asset_review_reply: true
					}
				},
				user: {
					select: {
						id: true,
						username: true,
					}
				}
			}
		});

		if (!canViewAsset(locals.user, asset)) {
			if (!asset?.is_published) {
				throw error(404, 'Not found');
			}
			throw error(403, 'Forbidden');
		}

		if (asset) {
			return {
				asset,
			};
		}
	}


	throw error(404, 'Not found');
};

export const PATCH: Action = async ({ locals, params, request }) => {
	const user = locals.user;
	if (!user) {
		throw error(401)
	}

	const asset_id = Number(params.id);
	const asset = db.asset.findUnique({ where: { asset_id } });

	if (!canEditAsset(user, asset)) {
		throw error(403, 'Forbidden');
	}

	const formData = await request.formData();
	const rawData = Object.fromEntries(formData);

	if (!(await patchSchema.validate(rawData))) {
		throw error(400, 'Bad Request');
	}

	await db.asset.update({
		where: { asset_id },
		data: {
			...patchSchema.cast(rawData),
		}
	});

	return {
		location: `/asset/${asset_id}`
	};
}