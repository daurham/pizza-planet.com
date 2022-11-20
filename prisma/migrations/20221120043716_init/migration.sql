-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT,
    "pricingMeasurment" TEXT,
    "supplierId" INTEGER NOT NULL,
    "img" TEXT,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    "polularity" INTEGER,
    "price" TEXT,
    "calories" INTEGER,
    "instructions" TEXT,
    "notes" TEXT,
    "img" TEXT,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topping_name_key" ON "Topping"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pizza_name_key" ON "Pizza"("name");

-- AddForeignKey
ALTER TABLE "Topping" ADD CONSTRAINT "Topping_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
