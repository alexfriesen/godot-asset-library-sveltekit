-- CreateTable
CREATE TABLE `asset_previews` (
    `preview_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type_id` TINYINT NOT NULL,
    `link` TEXT NOT NULL,
    `thumbnail` TEXT NULL,
    `caption` TEXT NULL,
    `asset_id` BIGINT UNSIGNED NOT NULL,

    INDEX `asset_previews_asset_id_foreign`(`asset_id`),
    PRIMARY KEY (`preview_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_review_replies` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment` TEXT NULL,
    `html_comment` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `asset_review_id` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `asset_review_replies_asset_review_id_unique`(`asset_review_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_reviews` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `is_positive` BOOLEAN NOT NULL,
    `comment` TEXT NULL,
    `html_comment` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `asset_id` BIGINT UNSIGNED NOT NULL,
    `author_id` BIGINT UNSIGNED NOT NULL,

    INDEX `asset_reviews_asset_id_foreign`(`asset_id`),
    INDEX `asset_reviews_author_id_foreign`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_versions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `version_string` VARCHAR(255) NOT NULL,
    `godot_version` VARCHAR(255) NOT NULL,
    `download_url` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL,
    `modify_date` DATETIME(0) NOT NULL,
    `asset_id` BIGINT UNSIGNED NOT NULL,

    INDEX `asset_versions_asset_id_foreign`(`asset_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assets` (
    `asset_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `blurb` VARCHAR(255) NULL,
    `category_id` TINYINT NOT NULL,
    `cost` VARCHAR(255) NOT NULL,
    `support_level_id` TINYINT NOT NULL DEFAULT 1,
    `description` TEXT NOT NULL,
    `html_description` TEXT NOT NULL,
    `tags` TEXT NULL,
    `browse_url` TEXT NOT NULL,
    `issues_url` TEXT NULL,
    `changelog_url` TEXT NULL,
    `donate_url` TEXT NULL,
    `icon_url` TEXT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `modify_date` DATETIME(0) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `is_archived` BOOLEAN NOT NULL DEFAULT false,
    `score` INTEGER NOT NULL DEFAULT 0,
    `author_id` BIGINT UNSIGNED NOT NULL,

    INDEX `assets_author_id_foreign`(`author_id`),
    FULLTEXT INDEX `assets_title_blurb_tags_idx`(`title`, `blurb`, `tags`),
    PRIMARY KEY (`asset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    INDEX `password_resets_email_index`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP(0) NULL,
    `password` VARCHAR(255) NULL,
    `provider` VARCHAR(255) NULL,
    `provider_id` VARCHAR(255) NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `is_blocked` BOOLEAN NOT NULL DEFAULT false,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_username_unique`(`username`),
    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asset_previews` ADD CONSTRAINT `asset_previews_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`asset_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `asset_review_replies` ADD CONSTRAINT `asset_review_replies_asset_review_id_foreign` FOREIGN KEY (`asset_review_id`) REFERENCES `asset_reviews`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `asset_reviews` ADD CONSTRAINT `asset_reviews_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`asset_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `asset_reviews` ADD CONSTRAINT `asset_reviews_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `asset_versions` ADD CONSTRAINT `asset_versions_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`asset_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
