import type { Asset } from "@prisma/client";

export const supportLevelMap = [
    { key: 0, name: 'Testing', icon: 'exclamation-circle', },
    { key: 1, name: 'Community', icon: '', },
    { key: 2, name: 'Official', icon: 'check', },
];

export const supportLevelKeys = supportLevelMap.map(({ key }) => key);

export const getSupportLevelName = (asset: Asset) => {
    return supportLevelMap.find(({ key }) => key === asset.support_level_id)?.name || '';
};

export const getSupportLevelIcon = (asset: Asset) => {
    return supportLevelMap.find(({ key }) => key === asset.support_level_id)?.icon || '';
};

export const getSupportLevelClass = (asset: Asset) => {
    return [
        'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'bg-gray-200 dark:bg-gray-700',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    ][asset.support_level_id];
};
