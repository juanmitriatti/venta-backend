import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoRepository } from './producto.repository';
import { ProductoEntity } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoRepository)
    private _productoRepository: ProductoRepository,
    private readonly logger: Logger,
  ) { }

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

  async remove(id: number): Promise<void> {
    let producto = await this._productoRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });

    if (!producto) {
      this.logger.error(
        `Producto con id  "${id}" ya estaba eliminado..`,
      );
      throw new BadRequestException(
        `Producto con id  "${id}"  ya estaba eliminado.`,
      );
    }

    producto.Status = 'DELETED';

    try {
      this.logger.log(
        `Producto con JDEEventID "${id}" se ha removido.`,
      );
      await this._productoRepository.save(producto);
    } catch (error) {
      this.logger.error(
        `Fallo al eliminar producton con ID "${id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
