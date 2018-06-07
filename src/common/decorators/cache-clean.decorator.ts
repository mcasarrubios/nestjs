import { ReflectMetadata } from '@nestjs/common';

export const CacheClean = (...paths: string[]) => ReflectMetadata('cachePaths', paths);
