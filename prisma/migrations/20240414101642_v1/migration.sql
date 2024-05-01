-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_entrega` VARCHAR(191) NOT NULL,
    `total` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contenido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` VARCHAR(191) NOT NULL,
    `producto` VARCHAR(191) NOT NULL,
    `precio_u` VARCHAR(191) NOT NULL,
    `subtotal` VARCHAR(191) NOT NULL,
    `pedidoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contenido` ADD CONSTRAINT `Contenido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
