import { error, type Actions } from "@sveltejs/kit";
import { db, updateAssetScore } from "$lib/database";
import { canEditReview } from "$lib/permissions";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    // throw redirect(301, `/asset/${params.id}`);
    const id = Number(params.id);
    const review = await db.assetReview.findUnique({ where: { id } });

    return {
        review
    }
};

export const actions: Actions = {
    delete: async ({ locals, params }) => {
        const user = locals.user;
        if (!user) {
            throw error(401);
        }

        const id = Number(params.id);
        const review = await db.assetReview.findUnique({ where: { id } });

        if (!review || !canEditReview(user, review)) {
            throw error(403, 'Forbidden');
        }

        await db.assetReview.delete({ where: { id } });
        await updateAssetScore(review.asset_id)

        return {
            location: `/asset/${review.asset_id}`
        };
    }
}