import type { Asset } from "@prisma/client";

export const enum Categories {
    CATEGORY_2D_TOOLS,
    CATEGORY_3D_TOOLS,
    CATEGORY_SHADERS,
    CATEGORY_MATERIALS,
    CATEGORY_TOOLS,
    CATEGORY_SCRIPTS,
    CATEGORY_MISC,
    CATEGORY_TEMPLATES,
    CATEGORY_PROJECTS,
    CATEGORY_DEMOS,
};

export const categoryNames = [
    '2D Tools',
    '3D Tools',
    'Shaders',
    'Materials',
    'Tools',
    'Scripts',
    'Misc',
    'Templates',
    'Projects',
    'Demos',
];

export const categoryIcons = [
    'picture-o',
    'cube',
    'book',
    'archive',
    'cogs',
    'file-text',
    'gamepad',
    'folder-open',
    'folder-open',
    'folder-open',
];

export const getCategoryIcon = (asset: Asset): string => {
    return categoryIcons[asset.category_id];
};
export const getCategoryName = (asset: Asset): string => {
    return categoryNames[asset.category_id];
};