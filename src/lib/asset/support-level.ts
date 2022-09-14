import type { Asset } from "@prisma/client";

export const supportLevelMap = [
    { key: 0, name: 'Testing', color: 'yellow', icon: 'exclamation-circle', },
    { key: 1, name: 'Community', color: 'gray', icon: '', },
    { key: 2, name: 'Official', color: 'green', icon: 'check', },
];

export const supportLevelKeys = supportLevelMap.map(({ key }) => key);

export const getSupportLevelName = (asset: Asset) => {
    return supportLevelMap.find(({ key }) => key === asset.support_level_id)?.name || '';
};

export const getSupportLevelIcon = (asset: Asset) => {
    return supportLevelMap.find(({ key }) => key === asset.support_level_id)?.icon || '';
};

export const getSupportLevelColor = (asset: Asset) => {
    return supportLevelMap.find(({ key }) => key === asset.support_level_id)?.color;
};
