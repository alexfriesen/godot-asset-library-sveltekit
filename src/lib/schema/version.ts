import { number, object, string } from "yup";
import { godotVersionKeys } from "$lib/asset/version/version";

export const assetVersionSchema = object({
    id: number(),
    version_string: string().matches(/[0-2]\.[0-9]\.[0-2]/),
    godot_version: string().oneOf(godotVersionKeys),
    download_url: string().url(),
})
    .noUnknown();