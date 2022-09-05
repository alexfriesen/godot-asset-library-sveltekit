import type { Asset } from "@prisma/client"

export const getIconUrl = (asset: Asset) => {
    return asset.icon_url || '/android-chrome-192x192.png';
} 