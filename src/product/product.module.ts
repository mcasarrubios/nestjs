import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../config'; 
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity-mongo';
import { CommonModule } from '../common/common.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product], config.databases.mongo.name),
    CommonModule,
    CacheModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
