import type { Asset, AssetReview, User } from "@prisma/client";

export const getPositiveReviews = (asset: Asset) => {
    return asset.asset_reviews.filter((review: AssetReview) => (review.is_positive));
}

export const isOwnReview = (user: User, review: AssetReview) => {
    return user && review.author_id === user.id;
}
