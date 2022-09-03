import prisma, { type Asset } from '@prisma/client';
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

export const updateScore = async (asset: Asset) => {
    const score = calculateScore(asset)
    await db.asset.update({
        where: { asset_id: asset.asset_id },
        data: { score }
    })
};