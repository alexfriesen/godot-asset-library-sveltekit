import type { Asset } from "@prisma/client";

export const licenseMap = [
    { key: 'AGPL-3.0-only', name: 'AGPLv3 only', },
    { key: 'AGPL-3.0-or-later', name: 'AGPLv3 or later', },
    { key: 'Apache-2.0', name: 'Apache 2', },
    { key: 'BSD-2-Clause', name: 'BSD 2-Clause', },
    { key: 'BSD-3-Clause', name: 'BSD 3-Clause', },
    { key: 'BSL-1.0', name: 'Boost Software License', },
    { key: 'CC0-1.0', name: 'CC0 1.0 Universal', },
    { key: 'CC-BY-3.0', name: 'CC BY 3.0 Unported', },
    { key: 'CC-BY-4.0', name: 'CC BY 4.0 International', },
    { key: 'CC-BY-SA-3.0', name: 'CC BY-SA 3.0 Unported', },
    { key: 'CC-BY-SA-4.0', name: 'CC BY-SA 4.0 International', },
    { key: 'LGPL-2.1-only', name: 'LGPLv2.1 only', },
    { key: 'LGPL-2.1-or-later', name: 'LGPLv2.1 or later', },
    { key: 'LGPL-3.0-only', name: 'LGPLv3 only', },
    { key: 'LGPL-3.0-or-later', name: 'LGPLv3 or later', },
    { key: 'GPL-2.0-only', name: 'GPLv2 only', },
    { key: 'GPL-2.0-or-later', name: 'GPLv2 or later', },
    { key: 'GPL-3.0-only', name: 'GPLv3 only', },
    { key: 'GPL-3.0-or-later', name: 'GPLv3 or later', },
    { key: 'MIT', name: 'MIT', },
    { key: 'MPL-2.0', name: 'MPLv2', },
    { key: 'Unlicense', name: 'The Unlicense License' },
];

export const licenseKeys = licenseMap.map(({ key }) => key);
export const licenseNames = licenseMap.map(({ name }) => name);
