import { ReflectMetadata } from '@nestjs/common';
import { CacheDecoratorOptions } from './cache-decorator-options.interface';

export const CacheOptions = (opts: CacheDecoratorOptions) => ReflectMetadata('cacheOptions', opts);
