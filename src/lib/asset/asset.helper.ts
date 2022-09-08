import type { Asset, AssetVersion } from "@prisma/client";
import { categoryMap } from "./category";
import { licenseMap } from "./license";

export const sanitizeBrowseUrl = (url: string) => {
    url = url
        .trim()
        .toLowerCase()
        .replace('http://', 'https://');

    if (url.endsWith('.git')) {
        url = url.replace(/\.git$/, '');
    }
    if (!url.endsWith('/')) {
        url = `${url}/`;
    }

    return url;
}

export const findAssetIssuesUrl = (asset: Asset) => {
    if (asset.issues_url) {
        return asset.issues_url;
    }

    return `${asset.browse_url}/issues`;
}

export const findIconUrl = (asset: Asset) => {
    return asset.icon_url || '/android-chrome-192x192.png';
}

export const findCategoryIcon = (asset: Asset): string => {
    return categoryMap.find(({ key }) => key === asset.category_id)?.icon || '';
};
export const findCategoryName = (asset: Asset): string => {
    return categoryMap.find(({ key }) => key === asset.category_id)?.name || '';
};

export const findLicenseName = (asset: Asset) => {
    return licenseMap.find(({ key }) => key === asset.cost)?.name || '';
};

export const findLatestVerion = (asset: Asset) => {
    return asset.asset_versions?.at(-1);
};

export const findDownloadUrl = (asset: Asset, version?: AssetVersion) => {
    const currentVersion = version || findLatestVerion(asset)

    if (currentVersion?.download_url) {
        return currentVersion.download_url;
    }

    if (asset.browse_url) {
        const splitUrl = asset.browse_url.split('/');

        // Slug of the form `user/repository`
        const slug = `${splitUrl[3]}/${splitUrl[4]}`;

        if (splitUrl[2] === 'github.com') {
            return `https://github.com/${slug}/archive/v${currentVersion?.version_string}.zip`;
        }
        if (splitUrl[2] === 'gitlab.com') {
            return `https://gitlab.com/$slug/-/archive/v${currentVersion?.version_string}.zip`;
        }
    }
}