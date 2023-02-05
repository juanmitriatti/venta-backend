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
  ): Promise<LineaEntity> {
    createLineaDto.factura = facturaEntidad;

    const linea = this.create(createLineaDto);

    //const linea = this.create(createLineaDto);

    try {
      Logger.log(`Linea con id "${linea.id}" has been created.`);
      await this.save(linea);
      return linea;
    } catch (error) {
      console.log(error);
      Logger.error(`Fallo al crear linea `);

      throw new InternalServerErrorException();
    }
  }
}
