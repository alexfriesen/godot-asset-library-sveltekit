import { number, object, string } from "yup";
import { godotVersionKeys } from "$lib/asset/version/version";

export const assetVersionSchema = object({
    id: number(),
    version_string: string().matches(/^\d*\.\d*\.\d*$/),
    godot_version: string().oneOf(godotVersionKeys),
    download_url: string().url(),
})
    .noUnknown();