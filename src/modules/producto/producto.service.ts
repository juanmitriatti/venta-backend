import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoRepository } from './producto.repository';
import { ProductoEntity } from './entities/producto.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoRepository)
    private _productoRepository: ProductoRepository,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<ProductoEntity[]> {
    return await this._productoRepository.find({ where: { Status: 'ACTIVE' } });
  }

  async createProducto(
    createProductoDto: createProductoDto,
  ): Promise<ProductoEntity> {
    return this._productoRepository.createProducto(createProductoDto);
  }

  async findOne(id: number): Promise<ProductoEntity> {
    const productoExiste = await this._productoRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });
    if (!productoExiste) throw new NotFoundException('Este producto no existe');
    return productoExiste;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this._productoRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });

    const updatedProducto = Object.assign(producto, updateProductoDto);
    // Set JDEEventID just in case the one coming from the body is different.
   // updatedProducto.id = id;
    //updatedProducto.updatedAt = Math.floor(Date.now() / 1000);

    try {
      this.logger.log(`Producto with evento "${id}" has been updated.`);
      return await this._productoRepository.save(updatedProducto);
    } catch (error) {
      this.logger.error(
        `Failed to update an product for id "${id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
