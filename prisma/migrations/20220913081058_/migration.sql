/*
  Warnings:

  - Made the column `created_at` on table `asset_review_replies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `asset_review_replies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `asset_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `asset_reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `password_resets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `asset_review_replies` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `asset_reviews` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `password_resets` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;
