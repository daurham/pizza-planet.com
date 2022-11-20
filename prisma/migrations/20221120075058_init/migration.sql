/*
  Warnings:

  - You are about to drop the column `polularity` on the `Pizza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "polularity",
ADD COLUMN     "popularity" INTEGER;
