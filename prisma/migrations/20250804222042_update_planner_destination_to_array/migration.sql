/*
  Warnings:

  - The `destination` column on the `planner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "planner" DROP COLUMN "destination",
ADD COLUMN     "destination" VARCHAR(255)[];
