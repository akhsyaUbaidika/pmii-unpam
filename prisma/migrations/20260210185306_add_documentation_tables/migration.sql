/*
  Warnings:

  - You are about to drop the `dokumentasi` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `excerpt` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL;

-- DropTable
DROP TABLE `dokumentasi`;

-- CreateTable
CREATE TABLE `Documentation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `coverImage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Documentation_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentationImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `documentationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DocumentationImage` ADD CONSTRAINT `DocumentationImage_documentationId_fkey` FOREIGN KEY (`documentationId`) REFERENCES `Documentation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
