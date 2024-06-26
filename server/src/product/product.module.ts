import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Photo } from './entities/photo.entity';
import { DimensionsWithPrice } from './entities/dimensions-with-price.entity';
import { Category } from './entities/category.entity';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Photo, DimensionsWithPrice, Category]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    ProductController,
    PhotoController,
    CategoryController,
    AuthController,
  ],
  providers: [
    ProductService,
    PhotoService,
    CategoryService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
