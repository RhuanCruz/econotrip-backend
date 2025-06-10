-- CreateTable
CREATE TABLE "planner" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "destination" VARCHAR(255) NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planner" ADD CONSTRAINT "planner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
