import { boolean, number, object, string } from "yup";

export const assetReviewSchema = object({
    id: number(),
    is_positive: boolean(),
    comment: string().trim(),
})
    .noUnknown();
