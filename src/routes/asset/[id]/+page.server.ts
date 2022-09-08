import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/database';
import { sendInvaldidErrors } from '$lib/form';
import { canEditAsset, canViewAsset } from '$lib/permissions';
import { assetSchema } from '../../../lib/schema/asset';
import { marked } from 'marked';

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
	default: async ({ locals, params, request }) => {
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
			await assetSchema.validate(rawData, { abortEarly: false });
		} catch (validationError: any) {
			return sendInvaldidErrors(validationError);
		}

		const data = assetSchema.cast(rawData);
		await db.asset.update({
			where: { asset_id },
			data: {
				...data,
				html_description: data.description ? marked(data.description) : undefined,
			}
		});

		return {
			location: `/asset/${asset_id}`
		};
	}
}