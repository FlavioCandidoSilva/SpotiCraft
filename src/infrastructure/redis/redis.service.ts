import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService {
  private client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async set(key: string, value: any, ttl?: number) {
    if (ttl) {
      await this.client.set(key, JSON.stringify(value), 'EX', ttl);
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
