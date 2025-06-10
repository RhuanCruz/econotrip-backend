-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "timezone" VARCHAR(32) NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "cordinate_lon" DOUBLE PRECISION NOT NULL,
    "cordinate_lat" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);
