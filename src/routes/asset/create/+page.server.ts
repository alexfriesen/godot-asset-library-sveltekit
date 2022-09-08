
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { canSubmitAsset } from '$lib/permissions';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;
    if (!user) {
        throw error(401);
    }


    if (!canSubmitAsset(locals.user)) {
        throw error(403, 'Forbidden');
    }
};
