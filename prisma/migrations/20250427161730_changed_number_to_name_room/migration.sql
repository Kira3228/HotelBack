/*
  Warnings:

  - You are about to drop the column `number` on the `Room` table. All the data in the column will be lost.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Room_number_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "number",
ADD COLUMN     "name" TEXT NOT NULL;
