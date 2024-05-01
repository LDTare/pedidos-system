/*
  Warnings:

  - You are about to alter the column `fecha_entrega` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `fecha_pedido` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pedido` ADD COLUMN `fecha_pedido` DATETIME(3) NOT NULL,
    MODIFY `fecha_entrega` DATETIME(3) NULL;
