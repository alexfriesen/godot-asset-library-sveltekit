import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { canEditAsset } from '$lib/permissions';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params, locals }) => {
	const asset_id = Number(params.id);

	if (asset_id) {
		const asset = await db.asset.findUnique({
			where: { asset_id },
			include: {
				versions: true,
				previews: true,
			}
		});

		if(!canEditAsset(locals.user, asset)){
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
