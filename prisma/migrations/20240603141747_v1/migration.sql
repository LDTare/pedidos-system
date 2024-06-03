-- CreateTable
CREATE TABLE `Sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_pedido` DATETIME(3) NOT NULL,
    `fecha_entrega` DATETIME(3) NULL,
    `total` INTEGER NULL,
    `estado` VARCHAR(191) NOT NULL,
    `sucursalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contenido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `producto` VARCHAR(191) NOT NULL,
    `precio_u` INTEGER NULL,
    `subtotal` INTEGER NULL,
    `pedidoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contenido` ADD CONSTRAINT `Contenido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
