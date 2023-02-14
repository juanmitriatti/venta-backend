import { IsOptional } from 'class-validator';

export class createFacturaDto {
 
  /*@IsOptional()
  total: number;*/

  @IsOptional()
  fecha: string;
}
