-- DropIndex
DROP INDEX "Image_path_key";

-- DropIndex
DROP INDEX "Image_url_key";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "area" INTEGER NOT NULL DEFAULT 0;
