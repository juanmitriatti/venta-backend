import { PartialType } from '@nestjs/mapped-types';
import { createProductoDto } from './create-producto.dto';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';

export class UpdateProductoDto extends PartialType(createProductoDto) {
    @IsOptional()
    id: number; 
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
  
    @IsString()
    @IsOptional()
    descripcion: string;
    
    @IsNotEmpty()
    @IsOptional()
    precio: number;

    @IsString()
    @IsOptional()
    Status: string;
}
