import type { Asset, AssetVersion } from "@prisma/client";

export const godotVersionMap = {
    // Any version (should only be used for non-code assets)
    '*': 'Any',

    // Any version in the Godot 3 series
    '3.x.x': 'Godot 3.x.x',

    '3.0.x': 'Godot 3.0.x',
    '3.1.x': 'Godot 3.1.x',
    '3.2.x': 'Godot 3.2.x',

    // Any version in the Godot 4 series
    '4.x.x': 'Godot 4.x.x',

    '4.0.x': 'Godot 4.0.x',
};

export const getLatestVerion = (asset: Asset) => {
    return asset.asset_versions?.at(-1);
};
export const getGodotVersion = (asset: Asset) => {
    return getLatestVerion(asset)?.godot_version;
};

export const getDownloadUrl = (asset: Asset, version?: AssetVersion) => {
    const currentVersion = version || getLatestVerion(asset)

    if (currentVersion.download_url) {
        return currentVersion.download_url;
    }

    if (asset.browse_url) {
        const splitUrl = asset.browse_url.split('/');

        // Slug of the form `user/repository`
        const slug = `${splitUrl[3]}/${splitUrl[4]}`;

        if (splitUrl[2] === 'github.com') {
            return `https://github.com/${slug}/archive/v${currentVersion.version_string}.zip`;
        }
        if (splitUrl[2] === 'gitlab.com') {
            return `https://gitlab.com/$slug/-/archive/v${currentVersion.version_string}.zip`;
        }
    }
}