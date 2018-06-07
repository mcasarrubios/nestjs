import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMMON_PROVIDERS } from './services';


@Module({
  providers: [...COMMON_PROVIDERS],
  exports: [...COMMON_PROVIDERS],
})
export class CommonModule {}