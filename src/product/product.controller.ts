import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
  ParseIntPipe,
  UseFilters,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/index';
import { CacheInterceptor } from '../common/interceptors/index';
import { UserRole } from '../user/user.constants';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<Product> {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseIntPipe())
    id,
    @Body() updateProductDto: CreateProductDto
  ): Promise<Product> {
    return await this.productService.updateById(id, updateProductDto);
  }
}