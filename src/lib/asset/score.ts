import type { Asset } from "@prisma/client";

export const getScoreColor = (asset: Asset) => {
    if (asset.score >= 15) {
        return 'text-blue-500 dark:text-blue-400';
    }
    if (asset.score >= 10) {
        return 'text-blue-600 dark:text-blue-300';
    }
    if (asset.score >= 5) {
        return 'text-blue-700 dark:text-blue-200';
    }
    if (asset.score >= -1) {
        return 'text-gray-700 dark:text-gray-500';
    }

    return 'text-red-700 dark:text-red-400';
};

export const calculateScore = (asset: Asset) => {
    let score = 0;

    for (const review of asset.asset_reviews) {
        score += review.is_positive ? 1 : -1;
    }

    return score;
};

