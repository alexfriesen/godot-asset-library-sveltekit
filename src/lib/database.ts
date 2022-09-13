import prisma from '@prisma/client';
import { calculateScore } from './asset/score';

export const db = new prisma.PrismaClient();

export const getUserById = (id: number) => {
    return db.user.findUnique({
        where: { id }, // TODO
        select: {
            id: true,
            username: true,
            full_name: true,
            email: true,
            email_verified_at: true,
            is_admin: true,
        }
    });
}

export const updateAssetScore = async (asset_id: number | bigint) => {
    const reviews = await db.assetReview.findMany({
        where: { asset_id },
        select: { id: true, is_positive: true }
    })
    const score = calculateScore(reviews);
    await db.asset.update({
        where: { asset_id },
        data: { score }
    });
};