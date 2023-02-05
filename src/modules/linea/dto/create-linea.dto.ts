import { IsNotEmpty } from 'class-validator';
import { FacturaEntity } from 'src/modules/factura/entities/factura.entity';

export class createLineaDto {
  @IsNotEmpty()
  precio: number;

  @IsNotEmpty()
  factura: FacturaEntity;
}
