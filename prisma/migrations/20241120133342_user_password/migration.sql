/*
  Warnings:

  - You are about to drop the column `password_hash` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "password_hash";

-- CreateTable
CREATE TABLE "user_password" (
    "user_id" INTEGER NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "current" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "user_password_user_id_password_hash_key" ON "user_password"("user_id", "password_hash");

-- AddForeignKey
ALTER TABLE "user_password" ADD CONSTRAINT "user_password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
