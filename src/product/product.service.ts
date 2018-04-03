import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Component()
export class ProductService {
    
  constructor(
    @InjectRepository(Product)
    private readonly photoRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    let _product = new Product();
    Object.assign(_product, product);
    return await this.photoRepository.save(_product);
  }

  async findAll(): Promise<Product[]> {
    return await this.photoRepository.find();
  }

  async findById(id: number): Promise<Product> {
    return await this.photoRepository.findOneById(+id);
  }
}