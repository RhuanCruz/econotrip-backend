/*
  Warnings:

  - Added the required column `city_name` to the `location` table without a default value. This is not possible if the table is not empty.
  - Made the column `iata_code` on table `location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "city_name" VARCHAR(255) NOT NULL,
ALTER COLUMN "city_code" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "iata_code" SET NOT NULL,
ALTER COLUMN "timezone" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "cordinate_lon" DROP NOT NULL,
ALTER COLUMN "cordinate_lat" DROP NOT NULL;
