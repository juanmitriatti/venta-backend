import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { FacturaEntity } from '../../factura/entities/factura.entity';

@Entity('linea')
export class LineaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'float' })
  precio: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(type => FacturaEntity, factura => factura.lineas)
  factura: FacturaEntity;

}
