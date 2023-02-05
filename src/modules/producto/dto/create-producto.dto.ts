import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
 
  export class createProductoDto {
  
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
 
