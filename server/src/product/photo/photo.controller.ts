import { Response } from 'express';
import { PhotoService } from './photo.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  Body,
  Delete,
} from '@nestjs/common';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/upload')
  @UseInterceptors(AnyFilesInterceptor())
  public async uploadPhoto(
    @UploadedFiles() file: Express.Multer.File[],
    @Res() res: Response,
  ) {
    console.log(33);
    const image = file[0];
    return res.status(200).send(await this.photoService.uploadPhoto(image));
  }

  @Post('/upload-multiple')
  @UseInterceptors(AnyFilesInterceptor())
  public async uploadMultiplePhotos(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const urls = await this.photoService.uploadPhotos(files);
      return res.status(200).send(urls);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Failed to upload photos', error });
    }
  }

  @Delete('/remove')
  public async deletePhoto(
    @Body('url') photoUrl: string,
    @Res() res: Response,
  ) {
    try {
      await this.photoService.deletePhoto(photoUrl);
      return res.status(200).send({ message: 'Photo deleted successfully' });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to delete photo', error });
    }
  }
}
