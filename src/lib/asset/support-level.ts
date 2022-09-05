import type { Asset } from "@prisma/client";

export const getSupportLevelName = (asset: Asset) => {
    return [
        'Testing',
        'Community',
        'Official'
    ][asset.support_level_id];
};

export const getSupportLevelClass = (asset: Asset) => {
    return [
        'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        'bg-gray-200 dark:bg-gray-700',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    ][asset.support_level_id];
};

export const getSupportLevelIcon = (asset: Asset) => {
    return [
        'exclamation-circle',
        '',
        'check'
    ][asset.support_level_id];
};