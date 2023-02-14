import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { FacturaEntity } from 'src/modules/factura/entities/factura.entity';
import { Type } from 'class-transformer';

export class productoLinea {
 
  @IsNotEmpty()
  precio: number;

  @IsNotEmpty()
  cantidad: number;
}

export class createLineaDto {

  /*@IsNotEmpty()
  productoLinea: productoLinea[];*/
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => productoLinea)
  productoLinea: productoLinea[];

  @IsNotEmpty()
  factura: FacturaEntity;
}