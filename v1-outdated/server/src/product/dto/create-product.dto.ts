import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumber,
  Min,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DimensionsWithPriceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  length: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  width: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  availableOnDemand: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  photos: string[];

  @ApiProperty({ type: [DimensionsWithPriceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DimensionsWithPriceDto)
  dimensions_with_price: DimensionsWithPriceDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  colors: string[];
}
