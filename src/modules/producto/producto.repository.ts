import { EntityRepository, Repository } from 'typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { createProductoDto } from './dto/create-producto.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(ProductoEntity)
export class ProductoRepository extends Repository<ProductoEntity> {
  async createProducto(
    createProductoDto: createProductoDto,
  ): Promise<ProductoEntity> {
    // createEventDto.Changed = Math.floor(Date.now() / 1000);
    console.log("llega",createProductoDto);
    const producto = this.create(createProductoDto);
    try {
      Logger.log(`Producto con nombre "${producto.nombre}" has been created.`);
      await this.save(producto);
      return producto;
    } catch (error) {
      Logger.error(`Fallo al crear producto :`,error);

      throw new InternalServerErrorException();
    }
  }
}
