import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
  Req
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ADMIN_ROLE } from './user.constants';
import { LoggingInterceptor, TransformInterceptor } from '../common/interceptors/index';
import { ParseIntPipe } from '../common/pipes/index';

@Controller('users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(ADMIN_ROLE)
  async findAll(): Promise<User[]> {
  // async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(ADMIN_ROLE)
  async findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('me')
  async findUserProfile(@Req() req): Promise<User> {
    return this.userService.findById(req.user.id);
  }

}