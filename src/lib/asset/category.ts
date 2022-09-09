export const enum Category {
    CATEGORY_2D_TOOLS = 0,
    CATEGORY_3D_TOOLS = 1,
    CATEGORY_SHADERS = 2,
    CATEGORY_MATERIALS = 3,
    CATEGORY_TOOLS = 4,
    CATEGORY_SCRIPTS = 5,
    CATEGORY_MISC = 6,
    CATEGORY_TEMPLATES = 7,
    CATEGORY_PROJECTS = 8,
    CATEGORY_DEMOS = 9,
}

export const categoryMap = [
    { key: Category.CATEGORY_2D_TOOLS, name: '2D Tools', icon: 'picture-o', },
    { key: Category.CATEGORY_3D_TOOLS, name: '3D Tools', icon: 'cube', },
    { key: Category.CATEGORY_SHADERS, name: 'Shaders', icon: 'book', },
    { key: Category.CATEGORY_MATERIALS, name: 'Materials', icon: 'archive', },
    { key: Category.CATEGORY_TOOLS, name: 'Tools', icon: 'cogs', },
    { key: Category.CATEGORY_SCRIPTS, name: 'Scripts', icon: 'file-text', },
    { key: Category.CATEGORY_MISC, name: 'Misc', icon: 'gamepad', },
    { key: Category.CATEGORY_TEMPLATES, name: 'Templates', icon: 'folder-open', },
    { key: Category.CATEGORY_PROJECTS, name: 'Projects', icon: 'folder-open', },
    { key: Category.CATEGORY_DEMOS, name: 'Demos', icon: 'folder-open', },
];

export const categoryKeys = categoryMap.map(({ key }) => key);
