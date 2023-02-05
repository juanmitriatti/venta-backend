import { Module, Logger } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { ProductoRepository } from './producto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoRepository])],
  controllers: [ProductoController],
  providers: [ProductoService, Logger]
})
 
export class ProductoModule {}