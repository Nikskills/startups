/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Startup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Startup_slug_key" ON "Startup"("slug");
