import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  photos?: string;

  @Column()
  colors: string;
}
