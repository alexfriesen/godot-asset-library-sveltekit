
import { error, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { canSubmitAsset } from '$lib/permissions';
import { sendInvaldidErrors } from '$lib/form';
import { assetSchema } from '$lib/schema/asset';
import { db } from '$lib/database';
import { marked } from 'marked';

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

export const actions: Actions = {
    default: async ({ locals, params, request }) => {
        const user = locals.user;
        if (!user) {
            throw error(401)
        }

        if (!canSubmitAsset(user)) {
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
        const asset = await db.asset.create({
            data: {
                ...data,
                html_description: data.description ? marked(data.description) : undefined,
                author_id: user.id,
            }
        });

        return {
            location: `/asset/${asset.asset_id}`
        };
    }
}
