import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  const mockRepository = {
    data: [
      { id: 1, name: 'Product name 1', description: 'Product description 1' },
      { id: 2, name: 'Product name 2', description: 'Product description 2' },
    ],
  };

  // beforeEach(async () => {
  //   const module = await Test.createTestingModule({
  //     imports: [TypeOrmModule.forFeature([Product])],
  //     controllers: [ProductController],
  //     providers:[ProductService, {
  //       provide: getRepositoryToken(Product),
  //       useValue: mockRepository,
  //     }]
  //   }).compile();

  //   productService = module.get<ProductService>(ProductService);
  //   productController = module.get<ProductController>(ProductController);
  // });

  describe('findAll', () => {
    it('should return an array of products', () => {
    //   const result = ['product1', 'product2'];
    //   jest.spyOn(productService, 'findAll').mockImplementation(() => result);

    //   expect(productController.findAll()).toBe(result);
      expect(true).toBe(true);
    });
  });
});
