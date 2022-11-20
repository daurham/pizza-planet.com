/*
  Warnings:

  - You are about to drop the column `pricingMeasurment` on the `Topping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "pricingMeasurment",
ADD COLUMN     "pricingMeasurement" TEXT;
