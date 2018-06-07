import { ReflectMetadata } from '@nestjs/common';

export const CacheUser = (userReplace: string) => ReflectMetadata('userReplace', userReplace);
