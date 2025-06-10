-- CreateTable
CREATE TABLE "radar" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "origin" VARCHAR(32) NOT NULL,
    "destination" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "radar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "radar" ADD CONSTRAINT "radar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
