export const godotVersionMap = [
    // Any version (should only be used for non-code assets)
    { key: '*', name: 'Any', },

    // Any version in the Godot 3 series
    { key: '3.x.x', name: 'Godot 3.x.x', },

    { key: '3.0.x', name: 'Godot 3.0.x', },
    { key: '3.1.x', name: 'Godot 3.1.x', },
    { key: '3.2.x', name: 'Godot 3.2.x', },
    { key: '3.3.x', name: 'Godot 3.3.x', },
    { key: '3.4.x', name: 'Godot 3.4.x', },
    { key: '3.5.x', name: 'Godot 3.5.x', },

    // Any version in the Godot 4 series
    { key: '4.x.x', name: 'Godot 4.x.x', },

    { key: '4.0.x', name: 'Godot 4.0.x', },
];

export const godotVersionKeys = godotVersionMap.map(({ key }) => key);
