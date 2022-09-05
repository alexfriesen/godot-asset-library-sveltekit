import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ url }) => {
	const where: any = {
		is_published: true,
		is_archived: false,
	};
	if (url.searchParams.has('category')) {
		where.category_id = Number(url.searchParams.get('category'));
	}
	if (url.searchParams.has('q')) {
		const query = url.searchParams.get('q');
		where.OR = [
			{ title: query },
			{ tags: query },
			{ blurb: query },
		]
	};

	// TODO: test properly
	const sort = url.searchParams.get('sort');
	let orderBy: Record<string, string> = { modify_date: 'asc' };
	if (url.searchParams.get('sort') === 'name') {
		orderBy = { title: 'asc' };
	}
	if (sort === 'rating') {
		orderBy = { score: 'asc' };
	}
	if (sort === 'cost') {
		orderBy = { cost: 'asc' };
	}

	const totalAssets = await db.asset.count({ where });
	const assets = await db.asset.findMany({
		orderBy,
		where,
		include: {
			asset_versions: {
				select: {
					version_string: true,
					godot_version: true,
					created_at: true,
				}
			},
			user: {
				select: {
					id: true,
					username: true,
				}
			}
		},
	});

	if (assets) {
		return {
			assets,
			totalAssets,
		};
	}

	return {
		assets: [],
		totalAssets: 0,
	};
};