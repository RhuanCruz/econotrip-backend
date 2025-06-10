-- CreateTable
CREATE TABLE "user_action" (
    "id" SERIAL NOT NULL,
    "short" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1024),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_action_log" (
    "id" SERIAL NOT NULL,
    "action_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" VARCHAR(32) NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "user_action_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_action_short_key" ON "user_action"("short");

-- AddForeignKey
ALTER TABLE "user_action_log" ADD CONSTRAINT "user_action_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_action_log" ADD CONSTRAINT "user_action_log_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "user_action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
