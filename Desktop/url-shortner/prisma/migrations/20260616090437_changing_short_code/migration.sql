/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortCode]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortCode` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Url_shortUrl_key` ON `url`;

-- AlterTable
ALTER TABLE `url` DROP COLUMN `shortUrl`,
    ADD COLUMN `shortCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Url_shortCode_key` ON `Url`(`shortCode`);
