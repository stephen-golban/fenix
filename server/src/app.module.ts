import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { Photo } from './product/entities/photo.entity';
import { DimensionsWithPrice } from './product/entities/dimensions-with-price.entity';
import { Category } from './product/entities/category.entity';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_HOST);
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [Product, Photo, DimensionsWithPrice, Category],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
