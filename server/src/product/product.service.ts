import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { DimensionsWithPrice } from './entities/dimensions-with-price.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    readonly productRepository: Repository<Product>,
    @InjectRepository(Photo)
    readonly photoRepository: Repository<Photo>,
    @InjectRepository(DimensionsWithPrice)
    readonly dimensionsWithPriceRepository: Repository<DimensionsWithPrice>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      title: createProductDto.title,
      description: createProductDto.description,
      availableOnDemand: createProductDto.availableOnDemand,
      provider: createProductDto.provider,
      categoryId: createProductDto.categoryId,
      color: createProductDto.colors.join('%'),
    });

    await this.productRepository.save(product);

    createProductDto.dimensions_with_price.forEach((dim) => {
      const dimension = this.dimensionsWithPriceRepository.create({
        width: dim.width,
        length: dim.length,
        height: dim.height,
        price: dim.price,
        productId: product.id,
      });
      return this.dimensionsWithPriceRepository.save(dimension);
    });

    createProductDto.photos.forEach((photo) => {
      const photoEntity = this.photoRepository.create({
        url: photo,
        productId: product.id,
      });
      return this.photoRepository.save(photoEntity);
    });

    const currentProduct = await this.productRepository.findOne({
      where: { id: product.id },
    });
    currentProduct['colors'] = currentProduct.color.split('%');
    delete currentProduct.color;
    return currentProduct;
  }

  async findAll() {
    const products = await this.productRepository.find();

    products.map((product) => {
      product['colors'] = product.color.split('%');
      delete product.color;
      return product;
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        photos: true,
        category: true,
        dimensions_with_price: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        color: true,
        provider: true,
        availableOnDemand: true,
        photos: {
          id: true,
          url: true,
        },
        category: {
          id: true,
          title: true,
        },
        dimensions_with_price: {
          id: true,
          width: true,
          height: true,
          length: true,
          price: true,
        },
      },
    });
    product['colors'] = product.color.split('%');
    delete product.color;
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.softDelete(id);
  }
}
