import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  availableOnDemand: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  color: string;
}
