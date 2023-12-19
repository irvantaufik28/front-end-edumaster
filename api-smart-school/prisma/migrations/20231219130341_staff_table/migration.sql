-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL,
    "nik" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "birth_place" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "foto_url" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_user" (
    "staff_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "staff_user_pkey" PRIMARY KEY ("staff_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_nik_key" ON "staff"("nik");

-- AddForeignKey
ALTER TABLE "staff_user" ADD CONSTRAINT "staff_user_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_user" ADD CONSTRAINT "staff_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
