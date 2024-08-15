import { Injectable, Scope } from '@nestjs/common';
import { LRUCache } from 'lru-cache';
import _ from 'lodash';
import { inspect } from 'util';

@Injectable({
  scope: Scope.DEFAULT,
})
export class CacheService {
  private cache: LRUCache<string, any>;

  constructor() {
    this.cache = new LRUCache<string, any>({
      maxSize: 5 * 1024 * 1024, // 5MB
      ttl: 3600 * 1000, // Cache for 1 hour (in milliseconds)
      sizeCalculation: (value: any, key: string) => {
        if (_.isBuffer(value) || _.isString(value)) {
          return Buffer.byteLength(value) + Buffer.byteLength(key);
        } else {
          return (
            Buffer.byteLength(
              inspect(value, {
                compact: true,
                breakLength: Infinity,
                depth: null,
              }),
            ) + Buffer.byteLength(key)
          );
        }
      },
    });
  }

  get(key: string): any {
    return _.cloneDeep(this.cache.get(key));
  }

  set(value: any, key: string, ttl?: number): void {
    this.cache.set(key, _.cloneDeep(value), { ttl: ttl });
  }
}
