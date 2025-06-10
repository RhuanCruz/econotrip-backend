/*
  Warnings:

  - You are about to drop the `airport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "airport";

-- DropTable
DROP TABLE "city";

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "city_code" VARCHAR(2) NOT NULL,
    "iata_code" VARCHAR(3),
    "timezone" VARCHAR(32) NOT NULL,
    "type" VARCHAR(8) NOT NULL,
    "cordinate_lon" DOUBLE PRECISION NOT NULL,
    "cordinate_lat" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);
