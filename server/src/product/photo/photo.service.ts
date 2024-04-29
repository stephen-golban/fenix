import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class PhotoService {
  constructor() {}

  async uploadPhoto(image: Express.Multer.File): Promise<string> {
    try {
      let url;
      const secret = this.generateRandomString(12);

      const s3 = new AWS.S3({
        endpoint: `https://eu2.contabostorage.com/0b56ce9974e047a0a28f48a2592629fd:image-storage`,
        accessKeyId: '4ff6d037166658d583ddbb3c7d96c30c',
        secretAccessKey: 'd7e060944abf4f017138a0c119908449',
        s3BucketEndpoint: true,
      });
      console.log(image);
      const uploadParams = {
        Bucket: '0b56ce9974e047a0a28f48a2592629fd:image-storage',
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
