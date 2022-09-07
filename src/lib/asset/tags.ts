import type { Asset } from "@prisma/client";

export const maxTagsLenght = 15;

export const getAssetTags = (asset: Asset) => {
    return (asset.tags || '').split(',');
}

export const sanitizeTags = (tags?: unknown) => {
    if (typeof tags !== 'string') return null;
    if (!tags) return tags;

    return tags
        .split(',') // split up to an array
        .map(value => value.toLowerCase()) // transform to lowercase
        .map(value => value.trim()) // removes surounding whitespaces
        .filter(value => !!value) // get rid of empty items
        .slice(0, maxTagsLenght) // keep the array within the size limit
        .join(','); // glue all the array together
}
