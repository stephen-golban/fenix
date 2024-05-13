import { Response } from 'express';
import { PhotoService } from './photo.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/upload')
  @UseInterceptors(AnyFilesInterceptor())
  public async getSuperAdminPhoto(
    @UploadedFiles() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(33);
    const image = file[0];
    return res.status(200).send(await this.photoService.uploadPhoto(image));
  }
}
