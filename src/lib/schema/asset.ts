import { array, boolean, number, object, string, } from 'yup';
import { licenseKeys } from '$lib/asset/license';
import { categoryKeys } from '$lib/asset/category';
import { supportLevelKeys } from '$lib/asset/support-level';
import { sanitizeBrowseUrl } from '$lib/asset/asset.helper';
import { sanitizeTags } from '$lib/asset/tags';

import { assetVersionSchema } from './version';

export const assetSchema = object({
    asset_id: number(),
    title: string().trim().max(50),
    blurb: string().trim().max(60),
    category_id: number().oneOf(categoryKeys),
    cost: string().oneOf(licenseKeys),
    support_level_id: number().oneOf(supportLevelKeys),
    description: string().trim(),
    tags: string().trim().transform(sanitizeTags),
    browse_url: string().url().transform(sanitizeBrowseUrl),
    issues_url: string().url(),
    changelog_url: string().url(),
    donate_url: string().url(),
    icon_url: string().url(),
    is_published: boolean(),
    is_archived: boolean(),

    versions: array(assetVersionSchema)
})
    .noUnknown();