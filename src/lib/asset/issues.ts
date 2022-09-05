import type { Asset } from "@prisma/client";

export const getIssuesUrl = (asset: Asset) => {
    if (asset.issues_url) {
        return asset.issues_url;
    }

    return `${asset.browse_url}/issues`;
}