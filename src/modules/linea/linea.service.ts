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
  ) { }

  async findAll(): Promise<any[]> {
   // return await this._lineaRepository.find();
   return await this._lineaRepository.createQueryBuilder("linea")
   .leftJoinAndSelect("linea.factura", "factura")
   .getMany()
  }

  
/**
 * Chequear porque la hora puede estar en +3
 * @returns 
 */
  async facturadoHoy(): Promise<LineaEntity[] | any> {
  
   return await this._lineaRepository.createQueryBuilder("linea")
    .leftJoinAndSelect("linea.factura", "factura")
    .select("SUM(linea.precio * linea.cantidad)", "sum")
    //.addSelect("@@global.time_zone", "fechaaa")
    .where("DATE_FORMAT(factura.fecha,'%Y/%m/%d') = DATE_FORMAT(curdate(),'%Y/%m/%d')")
    //.groupBy("linea.facturaId")
    .getRawMany();
  }
 
  async facturadoUltimosSiete(): Promise<LineaEntity[] | any> {
  
    return await this._lineaRepository.createQueryBuilder("linea")
     .leftJoinAndSelect("linea.factura", "factura")
     .select("SUM(linea.precio * linea.cantidad)", "sum")
     //.addSelect("factura.id", "id")
     .where("DATE_FORMAT(factura.fecha,'%Y/%m/%d') > DATE_FORMAT(curdate(),'%Y/%m/%d') - INTERVAL 7 day")
     //.groupBy("linea.facturaId")
     //.orderBy('factura.id', 'ASC')
     .getRawMany();
     //order_date > now() - INTERVAL 7 day
 
   }

   async facturadoUltimosSieteDetalle(): Promise<LineaEntity[] | any> {
  
    return await this._lineaRepository.createQueryBuilder("linea")
     .leftJoinAndSelect("linea.factura", "factura")
     .select("SUM(linea.precio * linea.cantidad)", "sum")
     .addSelect("DATE_FORMAT(factura.fecha,'%d-%m-%Y')", "dia")
     .where("DATE_FORMAT(factura.fecha,'%Y/%m/%d') > DATE_FORMAT(curdate(),'%Y/%m/%d') - INTERVAL 7 day")
     .groupBy("dia")
     .orderBy('factura.id', 'DESC')
     .limit(7)
     .getRawMany();
   }
   

  async createLinea(createLineaDto: createLineaDto): Promise<LineaEntity> {
    const facturaExiste = await this._facturaRepository.findOne(createLineaDto.factura);
    if (!facturaExiste) throw new NotFoundException('Este factura no existe');

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
