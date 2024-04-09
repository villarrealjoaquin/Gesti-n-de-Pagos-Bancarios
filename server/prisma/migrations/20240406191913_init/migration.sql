/*
  Warnings:

  - You are about to drop the column `Transaction_Number` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_Number]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_Number` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_Transaction_Number_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "Transaction_Number",
ADD COLUMN     "transaction_Number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_Number_key" ON "Payment"("transaction_Number");
