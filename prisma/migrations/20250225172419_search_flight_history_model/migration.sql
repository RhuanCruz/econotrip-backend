-- CreateTable
CREATE TABLE "flight_offer_search_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "search" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flight_offer_search_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flight_offer_search_history" ADD CONSTRAINT "flight_offer_search_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
