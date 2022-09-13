import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/database';
import { canViewUser } from '$lib/permissions';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals, params }) => {
    const currentUser = locals.user;
    const author_id = Number(params.id);

    if (author_id) {
        const user = await db.user.findUnique({
            where: { id: author_id },
            select: {
                username: true,
                full_name: true,
                is_admin: true,
                is_blocked: true,
            }
        });
        const reviews = await db.assetReview.findMany({
            where: { author_id },
            include: {
                reply: true,
                asset: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    }
                }
            }
        });


        if (reviews) {
            if (!canViewUser(currentUser, user)) {
                throw error(403, 'Forbidden');
            }

            return {
                user,
                reviews,
            };
        }
    }

    throw error(404, 'Not found');
};
