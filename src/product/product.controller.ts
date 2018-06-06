import { VError } from 'verror';
import {
  Controller,
  Get,
  Post,
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
import { Roles } from '../common/decorators/roles.decorator';
import { HttpExceptionFilter } from '../common/filters/index';
import { UserRole } from '../user/user.constants';

@Controller('products')
// @UseFilters(new HttpExceptionFilter())
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
  async findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<Product> {
    // try {
      const product = await this.productService.findById(id);
      if (!product) throw new NotFoundException();
      return product;
    // } catch(error) {
    //   // const verror = new VError(error, 'Product/findOne');
    //   // throw new ServiceUnavailableException(verror, verror.message);

    //   throw new ServiceUnavailableException();
    // }
  }
}