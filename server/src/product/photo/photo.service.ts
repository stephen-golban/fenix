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
      console.log(22);
      const s3 = new AWS.S3({
        endpoint: process.env.AMAZON_ENDPOINT,
        accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
        secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
        s3BucketEndpoint: true,
      });
      console.log(image);
      const uploadParams = {
        Bucket: process.env.AMAZON_BUCKET,
        Key: `${secret}.${image.originalname.split('.')[image.originalname.split('.').length - 1]}`,
        Body: image.buffer,
        ContentType: image.mimetype,
      };

      console.log(22);

      await s3
        .upload(uploadParams, (err, data) => {
          err && Logger.error(err);
          data && Logger.debug(`Uploaded successfully to ${data.Location}`);
        })
        .promise()
        .then((data) => {
          url = data.Location;
          console.log(data);
        });
      return url;
    } catch (err) {
      throw new Error(err);
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
