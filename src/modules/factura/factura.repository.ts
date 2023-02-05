import { EntityRepository, Repository } from 'typeorm';
import { FacturaEntity } from './entities/factura.entity';
import { createFacturaDto } from './dto/create-factura.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(FacturaEntity)
export class FacturaRepository extends Repository<FacturaEntity> {
  async createFactura(
    createFacturaDto: createFacturaDto,
  ): Promise<FacturaEntity> {
    const factura = this.create(createFacturaDto);
    try {
      Logger.log(`Factura con id "${factura.id}" has been created.`);
      await this.save(factura);
      return factura;
    } catch (error) {
      Logger.error(`Falló al crear factura `, error);
      throw new InternalServerErrorException();
    }
  }
}
