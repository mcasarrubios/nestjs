import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor, CacheInterceptor } from './common/interceptors/index';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Common
import { CommonModule } from './common/common.module';
import { AnyExceptionFilter } from './common/filters/index';

// Feature modules
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
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
