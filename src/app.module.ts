import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacturaModule } from './modules/factura/factura.module';
import { LineaModule } from './modules/linea/linea.module';
import { ProductoModule } from './modules/producto/producto.module';

 @Module({
  imports: [DatabaseModule, ProductoModule, FacturaModule, LineaModule],
})
export class AppModule {}
