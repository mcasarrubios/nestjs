import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/index';
import { AppController } from './app.controller';

// Common
import { CommonModule } from './common/common.module';
import { AnyExceptionFilter } from './common/filters/index';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';

// Feature modules
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CommonModule,
    CacheModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    }
  ]
})
export class AppModule {}
