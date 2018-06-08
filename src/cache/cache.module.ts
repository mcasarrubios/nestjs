import { Module } from '@nestjs/common';
import { CacheUtils } from './cache.utils';
import { CacheService } from './cache.service';
import { CacheInterceptor } from './cache.interceptor';
import { CommonModule } from 'common/common.module';

@Module({
  imports: [CommonModule],
  providers: [
    CacheUtils,
    CacheService
  ],
  exports: [
    CacheUtils,
    CacheService
  ]
})
export class CacheModule {}