import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { LineaRepository } from './linea.repository';
import { LineaEntity } from './entities/linea.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { FacturaRepository } from '../factura/factura.repository';

@Injectable()
export class LineaService {
  constructor(
    @InjectRepository(LineaRepository)
    @InjectRepository(FacturaRepository)
    private _lineaRepository: LineaRepository,
    private readonly logger: Logger,
    private _facturaRepository: FacturaRepository,
  ) {}

  async findAll(): Promise<LineaEntity[]> {
    return await this._lineaRepository.find();
  }

  async createLinea(createLineaDto: createLineaDto): Promise<LineaEntity> {
    const facturaExiste = await this._facturaRepository.findOne(2);

    return this._lineaRepository.createLinea(createLineaDto, facturaExiste);
  }

  async findOne(id: number): Promise<LineaEntity> {
    const lineaExiste = await this._lineaRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });
    if (!lineaExiste) throw new NotFoundException('Este linea no existe');
    return lineaExiste;
  }

  async update(id: number, updateLineaDto: UpdateLineaDto) {
    const linea = await this._lineaRepository.findOne(id, {
      where: { Status: 'ACTIVE' },
    });

    const updatedLinea = Object.assign(linea, updateLineaDto);
    // Set JDEEventID just in case the one coming from the body is different.
    // updatedLinea.id = id;
    //updatedLinea.updatedAt = Math.floor(Date.now() / 1000);

    try {
      this.logger.log(`Linea with evento "${id}" has been updated.`);
      return await this._lineaRepository.save(updatedLinea);
    } catch (error) {
      this.logger.error(
        `Failed to update an product for id "${id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} linea`;
  }
}
