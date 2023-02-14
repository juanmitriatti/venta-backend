import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { createFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller('factura')
export class FacturaController {
  constructor(private facturaService: FacturaService) {}

  @Post()
  create(@Body() createFacturaDto: createFacturaDto) {
    return this.facturaService.createFactura(createFacturaDto);
  }

  @Get()
  findAll(): Promise<FacturaEntity[]> {
    return this.facturaService.findAll();
  }

  /*@Get('lineas')
  findAllFacturasLineas(): Promise<FacturaEntity[]> {
    return this.facturaService.findAllFacturasLineas();
  }*/

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(+id, updateFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(+id);
  }
}
