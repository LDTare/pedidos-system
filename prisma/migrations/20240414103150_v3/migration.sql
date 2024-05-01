/*
  Warnings:

  - You are about to alter the column `cantidad` on the `Contenido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `precio_u` on the `Contenido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `subtotal` on the `Contenido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Contenido` MODIFY `cantidad` INTEGER NOT NULL,
    MODIFY `precio_u` INTEGER NOT NULL,
    MODIFY `subtotal` INTEGER NOT NULL;
