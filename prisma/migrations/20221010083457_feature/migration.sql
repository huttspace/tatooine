/*
  Warnings:

  - You are about to drop the `EnvironmentPlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `environments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeatureType" AS ENUM ('bool', 'dailyLimit', 'monthlyLimit');

-- DropForeignKey
ALTER TABLE "EnvironmentPlan" DROP CONSTRAINT "EnvironmentPlan_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "EnvironmentPlan" DROP CONSTRAINT "EnvironmentPlan_planId_fkey";

-- AlterTable
ALTER TABLE "environments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "EnvironmentPlan";

-- CreateTable
CREATE TABLE "environmentPlans" (
    "planId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "featureType" "FeatureType" NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvironmentFeature" (
    "environmentId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "bool" BOOLEAN,
    "limit" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "environmentPlans_planId_environmentId_key" ON "environmentPlans"("planId", "environmentId");

-- CreateIndex
CREATE UNIQUE INDEX "features_projectId_key_key" ON "features"("projectId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "EnvironmentFeature_featureId_environmentId_planId_key" ON "EnvironmentFeature"("featureId", "environmentId", "planId");

-- AddForeignKey
ALTER TABLE "environmentPlans" ADD CONSTRAINT "environmentPlans_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "environmentPlans" ADD CONSTRAINT "environmentPlans_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentFeature" ADD CONSTRAINT "EnvironmentFeature_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentFeature" ADD CONSTRAINT "EnvironmentFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentFeature" ADD CONSTRAINT "EnvironmentFeature_planId_environmentId_fkey" FOREIGN KEY ("planId", "environmentId") REFERENCES "environmentPlans"("planId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
