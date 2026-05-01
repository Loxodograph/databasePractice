/*
  Warnings:

  - You are about to drop the column `type` on the `Categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
