import { Module, Logger } from '@nestjs/common';
import { LineaService } from './linea.service';
import { LineaController } from './linea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaRepository } from './linea.repository';
import { FacturaRepository } from '../factura/factura.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LineaRepository, FacturaRepository])],
  controllers: [LineaController],
  providers: [LineaService, Logger],
})
export class LineaModule {}
