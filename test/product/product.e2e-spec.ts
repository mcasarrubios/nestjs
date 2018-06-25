import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../config'; 
import { TransformInterceptor } from '../../src/common/interceptors/index';
import {
  ProductService,
  Product,
  ProductModule
} from '../../src/product/index';
import { testDatabase } from '../database.test';
import { productServiceMock } from './product.service.mock';

describe('ProductModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ProductModule,
        testDatabase([Product]),
        TypeOrmModule.forFeature([Product], config.databases.mongo.name),
      ]
    })
      .overrideProvider(ProductService)
      .useValue(productServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  it('/GET /products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect({
        data: productServiceMock.findAll()
      });
  });
});
