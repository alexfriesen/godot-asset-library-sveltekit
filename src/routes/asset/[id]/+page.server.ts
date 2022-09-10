import { error, type Actions } from '@sveltejs/kit';
import type { ValidationError } from 'yup';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

import { db, updateAssetScore } from '$lib/database';
import { sendInvaldidErrors, parseFormdata } from '$lib/form';
import { canEditAsset, canSubmitReview, canViewAsset } from '$lib/permissions';
import { assetSchema } from '$lib/schema/asset';
import { assetReviewSchema } from '$lib/schema/review';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;
	const asset_id = Number(params.id);

	if (asset_id) {
		const asset = await db.asset.findUnique({
			where: { asset_id },
			include: {
				versions: true,
				previews: true,
				reviews: {
					include: {
						author: {
							select: {
								id: true,
								username: true,
							}
						},
						reply: true
					}
				},
				author: {
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
		const rawData = parseFormdata(formData);

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
				versions: {
					createMany: {
						data: data.versions,
						skipDuplicates: true,
					},
					update: data.versions?.filter(item => !!item.id).map((item) => ({
						where: { id: item.id },
						data: item
					})),
				},
				previews: {
					createMany: {
						data: data.previews,
						skipDuplicates: true,
					},
					update: data.previews?.filter(item => !!item.preview_id).map((item) => ({
						where: { preview_id: item.preview_id },
						data: item
					})),
				}
			}
		});

		return {
			location: `/asset/${asset_id}`
		};
	},

	addReview: async ({ locals, request, params }) => {
		const asset_id = Number(params.id);
		const user = locals.user;
		if (!user) {
			throw error(401);
		}

		const asset = await db.asset.findUnique({
			where: { asset_id },
			include: {
				reviews: true
			}
		});

		if (!asset) {
			throw error(400, 'Bad Request');
		}

		if (!canSubmitReview(user, asset)) {
			throw error(403, 'Forbidden');
		}

		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		try {
			await assetReviewSchema.validate(rawData, { abortEarly: false });
		} catch (validationError: ValidationError | any) {
			return sendInvaldidErrors(validationError);
		}

		const data = assetReviewSchema.cast(rawData);
		const review = await db.assetReview.create({
			data: {
				...data,
				html_comment: data.comment ? marked(data.comment) : undefined,
				author_id: user.id,
				asset_id,
			}
		});

		await updateAssetScore(asset_id);

		if (!review) {
			// return {
			//     status: 403,
			//     errors: {
			//         username: 'No user with this username'
			//     }
			// };
		}

		return {
			location: `/asset/${params.id}`
		};
	}
}