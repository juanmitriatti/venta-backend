import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LineaService } from './linea.service';
import { createLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { LineaEntity } from './entities/linea.entity';

@Controller('linea')
export class LineaController {
  constructor(private lineaService: LineaService) {}

  @Post()
  create(@Body() createLineaDto: createLineaDto) {
    return this.lineaService.createLinea(createLineaDto);
  }

  @Get()
  findAll(): Promise<any[]> {
    return this.lineaService.findAll();
  }

  @Get('/factura/hoy')
  findAllFacturas(): Promise<LineaEntity[] | any> {
    return this.lineaService.facturadoHoy();
  }

  @Get('/factura/ultimossiete')
  findFacturasUltimosSiete(): Promise<LineaEntity[] | any> {
    return this.lineaService.facturadoUltimosSiete();
  }

  @Get('/factura/ultimossietedetalle')
  findFacturasUltimosSieteDetalle(): Promise<LineaEntity[] | any> {
    return this.lineaService.facturadoUltimosSieteDetalle();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineaService.findOne(+id);
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLineaDto: UpdateLineaDto,
  ) {
    return this.lineaService.update(+id, updateLineaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineaService.remove(+id);
  }
}
