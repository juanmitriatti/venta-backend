import { PartialType } from '@nestjs/mapped-types';
import { createLineaDto } from './create-linea.dto';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateLineaDto extends PartialType(createLineaDto) {
   /* @IsOptional()
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
    Status: string;*/
}
