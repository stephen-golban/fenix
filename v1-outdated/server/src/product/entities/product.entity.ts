import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Photo } from './photo.entity'; // Import the Photo entity
import { DimensionsWithPrice } from './dimensions-with-price.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  availableOnDemand: boolean;

  @Column()
  provider: string;

  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos: Photo[];

  @OneToMany(
    () => DimensionsWithPrice,
    (dimensionsWithPrice) => dimensionsWithPrice.product,
    { cascade: true },
  )
  dimensions_with_price: DimensionsWithPrice[];

  @Column({ nullable: false, name: 'category_id', type: 'varchar' })
  @Index()
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  color: string;
}
