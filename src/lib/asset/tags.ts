import type { Asset } from "@prisma/client";

export const getAssetTags = (asset: Asset) => {
    return (asset.tags || '').split(',');
}