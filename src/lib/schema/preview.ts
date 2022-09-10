import { number, object, string } from "yup";
import { AssetPreviewType } from "../asset/preview";

export const assetPreviewSchema = object({
    preview_id: number(),
    type_id: number().oneOf(Object.values(AssetPreviewType)),
    link: string().url(),
    thumbnail: string().url(),
    caption: string().max(60),
})
    .noUnknown();
