/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Talent" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Talent_authId_key" ON "Talent"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_email_key" ON "Talent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authId_key" ON "Customer"("authId");
