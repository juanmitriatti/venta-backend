import { EntityRepository, Repository } from 'typeorm';
import { LineaEntity } from './entities/linea.entity';
import { createLineaDto } from './dto/create-linea.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { FacturaEntity } from '../factura/entities/factura.entity';

@EntityRepository(LineaEntity)
export class LineaRepository extends Repository<LineaEntity> {
  async createLinea(
    createLineaDto: createLineaDto,
    facturaEntidad: FacturaEntity,
  ): Promise<LineaEntity | LineaEntity[] | any> {

    createLineaDto.factura = facturaEntidad;
    let linea = [];
    if (createLineaDto.productoLinea) {
      createLineaDto.productoLinea.forEach(async (arrayItem) => {

        const linea = this.create({
          precio: arrayItem.precio,
          factura: facturaEntidad,
          cantidad: arrayItem.cantidad,
        });

        try {
          await this.save(linea);
          Logger.log(`Linea  ha sido creada.`);
          return linea;
        } catch (error) {
          console.log(error);
          Logger.error(`Fallo al crear linea `);

          throw new InternalServerErrorException();
        }
      });
      return linea;
    }
  }
}