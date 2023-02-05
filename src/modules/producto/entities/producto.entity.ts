import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('producto')
export class ProductoEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    nombre: string;
  
    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'float' })
    precio: number;

    @Column({ default: 'ACTIVE', type: 'varchar', length: 8 })
    Status: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  }