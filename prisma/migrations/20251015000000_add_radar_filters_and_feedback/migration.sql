-- AlterTable
ALTER TABLE "radar" ADD COLUMN "airline" VARCHAR(64),
ADD COLUMN "trip_type" VARCHAR(16) DEFAULT 'ONE_WAY',
ADD COLUMN "return_date_range" INTEGER DEFAULT 15;

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "message" VARCHAR(5000) NOT NULL,
    "rating" INTEGER,
    "email" VARCHAR(255),
    "status" VARCHAR(16) NOT NULL DEFAULT 'PENDING',
    "attachments" TEXT[],
    "user_agent" VARCHAR(512),
    "ip_address" VARCHAR(45),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feedback_user_id_created_at_idx" ON "feedback"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "feedback_category_status_idx" ON "feedback"("category", "status");

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
