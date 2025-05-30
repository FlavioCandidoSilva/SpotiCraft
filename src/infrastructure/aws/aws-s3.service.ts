import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsS3Service {
  private s3: S3Client;

  constructor(private config: ConfigService) {
    this.s3 = new S3Client({
      region: config.get('AWS_REGION'),
      credentials: {
        accessKeyId: config.get('AWS_ACCESS_KEY'),
        secretAccessKey: config.get('AWS_SECRET_KEY'),
      },
    });
  }

  async uploadFile(buffer: Buffer, filename: string, mimetype: string): Promise<string> {
    const key = `${randomUUID()}-${filename}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: this.config.get('AWS_BUCKET'),
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    }));

    return `https://${this.config.get('AWS_BUCKET')}.s3.amazonaws.com/${key}`;
  }


  async getSignedUrlFromFilename(filename: string): Promise<string> {
    const key = `songs/${filename}`;
    const command = new GetObjectCommand({
      Bucket: this.config.get('AWS_BUCKET'),
      Key: key,
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 60 });
  }

  async getSignedUrlFromUrlPath(songUrl: string): Promise<string> {
    const filename = songUrl.split('/').pop();
    if (!filename) throw new Error('Arquivo inválido ou URL incompleta');

    const command = new GetObjectCommand({
      Bucket: this.config.get('AWS_BUCKET'),
      Key: filename,
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 60 });
  }

}
