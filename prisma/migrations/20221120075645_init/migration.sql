/*
  Warnings:

  - You are about to drop the column `staffId` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Topping` table. All the data in the column will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pizza" DROP CONSTRAINT "Pizza_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_supplierId_fkey";

-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "staffId";

-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "supplierId";

-- DropTable
DROP TABLE "Supplier";
