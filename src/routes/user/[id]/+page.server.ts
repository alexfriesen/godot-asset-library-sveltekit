import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { canViewUser } from '$lib/permissions';
import { db } from '$lib/database';
import type { User } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals, params }) => {
    const currentUser = locals.user;
    const id = Number(params.id);

    if (id) {
        const user = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                created_at: true,
                is_admin: true,
                is_blocked: true,

                password: false,
                remember_token: false,

                assets: {
                    select: {
                        asset_id: true,
                        title: true,
                        blurb: true,
                        author_id: true,
                        created_at: true,
                        modify_date: true,
                        support_level_id: true,
                        icon_url: true,
                        category_id: true,
                        tags: true,
                        score: true,
                        cost: true,
                        author: {
                            select: {
                                username: true,
                            }
                        },
                        versions: {
                            select: {
                                version_string: true,
                                godot_version: true,
                                created_at: true,
                            }
                        }
                    },
                },
                reviews: true,
            }
        });


        if (user) {
            if (!canViewUser(currentUser, user)) {
                throw error(403, 'Forbidden');
            }

            return {
                user,
            };
        }
    }

    throw error(404, 'Not found');
};
