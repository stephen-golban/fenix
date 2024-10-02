import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PhotoService {
  constructor() {}

  async uploadPhoto(image: Express.Multer.File): Promise<string> {
    try {
      let url;
      const secret = this.generateRandomString(12);
      const s3 = new AWS.S3({
        endpoint: process.env.AMAZON_ENDPOINT,
        accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
        secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
        s3BucketEndpoint: true,
      });

      const uploadParams = {
        Bucket: process.env.AMAZON_BUCKET,
        Key: `${secret}.${image.originalname.split('.').pop()}`,
        Body: image.buffer,
        ContentType: image.mimetype,
      };

      await s3
        .upload(uploadParams, (err, data) => {
          if (err) Logger.error(err);
          if (data) Logger.debug(`Uploaded successfully to ${data.Location}`);
        })
        .promise()
        .then((data) => {
          url = data.Location;
        });
      return url;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async uploadPhotos(images: Express.Multer.File[]): Promise<string[]> {
    try {
      const uploadPromises = images.map((image) => this.uploadPhoto(image));
      return await Promise.all(uploadPromises);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletePhoto(photoUrl: string): Promise<void> {
    try {
      const s3 = new AWS.S3({
        endpoint: process.env.AMAZON_ENDPOINT,
        accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
        secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
        s3BucketEndpoint: true,
      });

      const url = new URL(photoUrl);
      const key = url.pathname.substring(1); // Remove leading '/'

      const deleteParams = {
        Bucket: process.env.AMAZON_BUCKET,
        Key: key,
      };

      await s3
        .deleteObject(deleteParams, (err, data) => {
          if (err) Logger.error(err);
          if (data) Logger.debug(`Deleted successfully: ${key}`);
        })
        .promise();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  private generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
