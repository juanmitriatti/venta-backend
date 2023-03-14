import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacturaModule } from './modules/factura/factura.module';
import { LineaModule } from './modules/linea/linea.module';
import { ProductoModule } from './modules/producto/producto.module';
import { ConfigModule } from '@nestjs/config';

 @Module({
  imports: [DatabaseModule, ProductoModule, FacturaModule, LineaModule, ConfigModule.forRoot()],
})
export class AppModule {}
