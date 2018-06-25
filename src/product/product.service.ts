import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity-mongo';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const _product = new Product();
    Object.assign(_product, product);
    return await this.productRepository.save(_product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne(+id);
  }

  async updateById(id: number, data: any): Promise<any> {
    return await this.productRepository.update(id, data);
  }
}
