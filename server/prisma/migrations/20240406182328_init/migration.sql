/*
  Warnings:

  - You are about to drop the column `destination` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Transaction_Number]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Transaction_Number` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "destination",
ADD COLUMN     "Transaction_Number" INTEGER NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_Transaction_Number_key" ON "Payment"("Transaction_Number");
