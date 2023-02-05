import { PartialType } from '@nestjs/mapped-types';
import { createFacturaDto } from './create-factura.dto';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateFacturaDto extends PartialType(createFacturaDto) {
    @IsOptional()
    id: number; 
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
  
    @IsString()
    @IsOptional()
    descripcion: string;

    @IsOptional()
    precio: number;

    @IsString()
    @IsOptional()
    Status: string;
}
