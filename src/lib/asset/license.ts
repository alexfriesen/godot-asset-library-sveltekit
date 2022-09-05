import type { Asset } from "@prisma/client";

export const licenseMap: Record<string, string> = {
    'AGPL-3.0-only': 'AGPLv3 only',
    'AGPL-3.0-or-later': 'AGPLv3 or later',
    'Apache-2.0': 'Apache 2',
    'BSD-2-Clause': 'BSD 2-Clause',
    'BSD-3-Clause': 'BSD 3-Clause',
    'BSL-1.0': 'Boost Software License',
    'CC0-1.0': 'CC0 1.0 Universal',
    'CC-BY-3.0': 'CC BY 3.0 Unported',
    'CC-BY-4.0': 'CC BY 4.0 International',
    'CC-BY-SA-3.0': 'CC BY-SA 3.0 Unported',
    'CC-BY-SA-4.0': 'CC BY-SA 4.0 International',
    'LGPL-2.1-only': 'LGPLv2.1 only',
    'LGPL-2.1-or-later': 'LGPLv2.1 or later',
    'LGPL-3.0-only': 'LGPLv3 only',
    'LGPL-3.0-or-later': 'LGPLv3 or later',
    'GPL-2.0-only': 'GPLv2 only',
    'GPL-2.0-or-later': 'GPLv2 or later',
    'GPL-3.0-only': 'GPLv3 only',
    'GPL-3.0-or-later': 'GPLv3 or later',
    MIT: 'MIT',
    'MPL-2.0': 'MPLv2',
    Unlicense: 'The Unlicense License'
};

export const getLicenseName = (asset: Asset) => {
    return licenseMap[asset.cost] || '';
};