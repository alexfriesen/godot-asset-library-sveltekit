import { number, object, string } from "yup";

export const assetReviewReplySchema = object({
    id: number(),
    comment: string().trim().ensure(),
})
    .noUnknown();
