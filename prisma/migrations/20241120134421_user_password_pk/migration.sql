/*
  Warnings:

  - A unique constraint covering the columns `[user_id,current]` on the table `user_password` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_password_user_id_password_hash_key";

-- AlterTable
ALTER TABLE "user_password" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_password_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_user_id_current_key" ON "user_password"("user_id", "current");
