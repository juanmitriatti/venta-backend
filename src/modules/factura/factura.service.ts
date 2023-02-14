import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { FacturaRepository } from './factura.repository';
import { FacturaEntity } from './entities/factura.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(FacturaRepository)
    private _facturaRepository: FacturaRepository,
    private readonly logger: Logger,
  ) { }

  async findAll(): Promise<FacturaEntity[]> {
    return await this._facturaRepository.find();
  }
 // async findAllFacturasLineas(): Promise<FacturaEntity[]> {
    /*const userRepository = dataSource.getRepository(User)
    const users = await userRepository.find({
        relations: {
            photos: true,
        },
    })*/
   /* const users = await this._facturaRepository.find({
      relations: {
        linea: true,
      },
    })*/
   // return users;
    // return await this._facturaRepository.find();
  //}

  async createFactura(
    createFacturaDto: createFacturaDto,
  ): Promise<FacturaEntity> {
    return this._facturaRepository.createFactura(createFacturaDto);
  }

  async findOne(id: number): Promise<FacturaEntity> {
    const facturaExiste = await this._facturaRepository.findOne(id);
    if (!facturaExiste) throw new NotFoundException('Este factura no existe');
    return facturaExiste;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    const factura = await this._facturaRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });

    const updatedFactura = Object.assign(factura, updateFacturaDto);
    // Set JDEEventID just in case the one coming from the body is different.
    // updatedFactura.id = id;
    //updatedFactura.updatedAt = Math.floor(Date.now() / 1000);

    try {
      this.logger.log(`Factura with evento "${id}" has been updated.`);
      return await this._facturaRepository.save(updatedFactura);
    } catch (error) {
      this.logger.error(
        `Failed to update an product for id "${id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
}
