import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { LineaEntity } from '../../linea/entities/linea.entity';

@Entity('factura')
export class FacturaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(type => LineaEntity, linea => linea.factura) lineas: LineaEntity[];

  @Column({ type: 'float' })
  total: number;

  /*@Column({ type: 'timestamp' })
  fecha: number;*/
  @Column({ type: 'date' })
  fecha: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
