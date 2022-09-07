import { error, type Actions } from '@sveltejs/kit';
import { boolean, number, object, string, } from 'yup';
import type { PageServerLoad } from './$types';

import { db } from '$lib/database';
import { sendInvaldidErrors } from '$lib/form';
import { canEditAsset, canViewAsset } from '$lib/permissions';

import { licenseKeys } from '$lib/asset/license';
import { categoryKeys } from '$lib/asset/category';
import { supportLevelKeys } from '$lib/asset/support-level';
import { sanitizeBrowseUrl } from '$lib/asset/asset.helper';
import { sanitizeTags } from '$lib/asset/tags';

const schema = object({
	title: string().trim().max(50),
	blurb: string().trim().max(60),
	category_id: number().oneOf(categoryKeys),
	cost: string().oneOf(licenseKeys),
	support_level_id: number().oneOf(supportLevelKeys),
	description: string().trim(),
	tags: string().trim().transform(sanitizeTags),
	browse_url: string().url().transform(sanitizeBrowseUrl),
	issues_url: string().url(),
	changelog_url: string().url(),
	donate_url: string().url(),
	icon_url: string().url(),
	is_published: boolean(),
	is_archived: boolean(),
})
	.noUnknown();

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;
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

		if (!canViewAsset(user, asset)) {
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

export const actions: Actions = {
	update: async ({ locals, params, request }) => {
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

		try {
			await schema.validate(rawData, { abortEarly: false });
		} catch (validationError: any) {
			return sendInvaldidErrors(validationError);
		}

		await db.asset.update({
			where: { asset_id },
			data: {
				...schema.cast(rawData),
			}
		});

		return {
			location: `/asset/${asset_id}`
		};
	}
}