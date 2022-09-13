import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { clamp } from '$lib/utils';
import { Category } from '$lib/asset/category';

export const load: PageServerLoad = async ({ url }) => {
	const itemsPerPage = clamp(Number(url.searchParams.get('max_results') || 40), 1, 40);
	const offset = (Number(url.searchParams.get('page') || 1) - 1) * itemsPerPage;

	const where: any = {
		is_published: true,
		is_archived: false,
	};

	const type = url.searchParams.get('type');
	if (type) {
		switch (type) {
			case 'addon':
				where.category_id = { notIn: [Category.CATEGORY_TEMPLATES, Category.CATEGORY_PROJECTS, Category.CATEGORY_DEMOS] };
				break;
			case 'project':
				where.category_id = { in: [Category.CATEGORY_TEMPLATES, Category.CATEGORY_PROJECTS, Category.CATEGORY_DEMOS] };
				break;
		}
	}

	const category = url.searchParams.get('category');
	if (category) {
		where.category_id = Number(category);
	}

	const user = url.searchParams.get('user');
	if (user) {
		where.author_id = Number(user);
	}

	const filter = url.searchParams.get('filter')
	if (filter) {
		const filterQuery = { contains: filter || '' };
		where.OR = [
			...where.OR || [],
			{ title: filterQuery },
			{ tags: filterQuery },
			{ blurb: filterQuery },
		]
	};

	const sort = url.searchParams.get('sort');
	const reverse = url.searchParams.get('reverse') ? true : false;

	// order by modify_date per default
	let orderBy: Record<string, string> = { modify_date: reverse ? 'asc' : 'desc' };
	if (sort === 'rating') {
		orderBy = { score: reverse ? 'asc' : 'desc' };
	}
	if (sort === 'name') {
		orderBy = { title: reverse ? 'desc' : 'asc' };
	}
	if (sort === 'cost') {
		orderBy = { cost: reverse ? 'desc' : 'asc' };
	}

	const totalAssets = await db.asset.count({ where });
	const assets = await db.asset.findMany({
		orderBy,
		where,
		include: {
			versions: {
				select: {
					version_string: true,
					godot_version: true,
					created_at: true,
				},
				orderBy: { created_at: 'desc' },
				take: 1,
			},
			author: {
				select: {
					id: true,
					username: true,
				}
			}
		},
		take: itemsPerPage,
		skip: offset,
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