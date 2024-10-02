import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class DimensionsWithPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  width: number;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  price: number;

  @Column({ nullable: false, name: 'product_id', type: 'varchar' })
  @Index()
  productId!: string;

  @ManyToOne(() => Product, (product) => product.photos)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
