import type { Asset, AssetReview, User } from "@prisma/client";

export const isAdmin = (user: User) => {
    return user && user.is_admin;
}

export const canSubmitAsset = (user: User) => {
    return user && !user.is_blocked;
}

export const canViewAsset = (user: User, asset: Asset) => {
    return asset && asset.is_published || user && user.is_admin || user && asset.author_id === user.id;
}

export const canEditAsset = (user: User, asset: Asset) => {
    return user && !user.is_blocked && (user.is_admin || user.id === asset.author_id);
}

export const canSubmitReview = (user: User, asset: Asset) => {
    if (
        !user || user.is_blocked || !user.email_verified_at || asset.author_id === user.id || asset.is_archived
    ) {
        return false;
    }

    for (const review of asset.asset_reviews) {
        if (review.author_id === user.id) {
            return false;
        }
    }

    return true;
}

export const canEditReview = (user: User, review: AssetReview) => {
    return user && !user.is_blocked && (user.is_admin || user.id === review.author_id);

    return false;
}

export const canSubmitReviewReply = (user: User, asset: Asset, review: AssetReview) => {
    if (asset) {
        return user && !user.is_blocked &&
            user.email_verified_at &&
            asset.author_id === user.id &&
            !review.asset_review_reply;
    }

    return false;
}

export const canViewUser = (user: User, target: User) => {
    if (target.is_blocked) {
        // allow admins see blocked users
        if (user && user.is_admin) {
            return true;
        }

        return false;
    }

    return true;
}
export const canBlockUser = (user: User, target: User) => {
    return (user && user.is_admin) && (target && !target.is_admin);
}