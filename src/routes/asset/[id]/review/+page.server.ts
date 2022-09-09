import { error, redirect, type Actions } from "@sveltejs/kit";
import { boolean, object, string, ValidationError } from "yup";
import { marked } from "marked";

import { sendInvaldidErrors } from "$lib/form";
import { canSubmitReview } from "$lib/permissions";
import { db, updateAssetScore } from "$lib/database";
import type { PageServerLoad } from './$types';

const schema = object({
    is_positive: boolean(),
    comment: string(),
})
    .noUnknown();

export const load: PageServerLoad = async ({ params }) => {
    throw redirect(301, `/asset/${params.id}`);
};

export const actions: Actions = {
    create: async ({ locals, request, params }) => {
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
            await schema.validate(rawData, { abortEarly: false });
        } catch (validationError: ValidationError | any) {
            return sendInvaldidErrors(validationError);
        }

        const data = schema.cast(rawData);
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
};
