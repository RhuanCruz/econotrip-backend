-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" VARCHAR(1024) NOT NULL,
    "data" JSONB,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "radar_notification" (
    "id" SERIAL NOT NULL,
    "radar_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "radar_notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_type_name_key" ON "notification_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "radar_notification_radar_id_notification_id_key" ON "radar_notification"("radar_id", "notification_id");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "notification_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radar_notification" ADD CONSTRAINT "radar_notification_radar_id_fkey" FOREIGN KEY ("radar_id") REFERENCES "radar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "radar_notification" ADD CONSTRAINT "radar_notification_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
