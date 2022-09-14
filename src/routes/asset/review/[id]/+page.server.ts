import { error, redirect, type Actions } from "@sveltejs/kit";
import { marked } from "marked";

import { db, updateAssetScore } from "$lib/database";
import { parseFormdata, sendInvaldidErrors } from "$lib/form";
import { canEditReview, canSubmitReviewReply } from "$lib/permissions";
import { assetReviewReplySchema } from "$lib/schema/reply.schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    // throw redirect(301, `/asset/${params.id}`);
    const id = Number(params.id);
    const review = await db.assetReview.findUnique({ where: { id } });

    throw redirect(301, `/asset/${review?.asset_id || ''} `);
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
            success: true,
            location: `/asset/${review.asset_id}`
        };
    },

    reply: async ({ locals, params, request }) => {
        const user = locals.user;
        if (!user) {
            throw error(401);
        }

        const id = Number(params.id);
        const review = await db.assetReview.findUnique({
            where: { id },
            include: { asset: true, reply: true, }
        });

        if (!review || !canSubmitReviewReply(user, review.asset, review)) {
            throw error(403, 'Forbidden');
        }

        const formData = await request.formData();
        const rawData = parseFormdata(formData);

        try {
            await assetReviewReplySchema.validate(rawData, { abortEarly: false });
        } catch (validationError: any) {
            return sendInvaldidErrors(validationError);
        }

        const data = assetReviewReplySchema.cast(rawData);

        await db.assetReviewReply.create({
            data: {
                comment: data.comment,
                html_comment: marked(data.comment || ''),
                asset_review_id: id,
            }
        });

        return {
            success: true,
            location: `/asset/${review.asset_id}`
        };
    },
}