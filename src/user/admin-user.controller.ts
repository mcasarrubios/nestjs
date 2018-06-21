import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Req,
  ParseIntPipe,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserProfileDto } from './dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators';
import { CacheOptions, CacheInterceptor, CacheCleanerInterceptor } from '../cache/index';
import { UserRole } from './user.constants';
import { config } from '../../config/index';

@Controller(`${config.adminPath}/users`)
@UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles(UserRole.admin)
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(
    @Param('id', new ParseIntPipe()) id
  ): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Put(':id')
  @UseInterceptors(CacheCleanerInterceptor)
  @CacheOptions({
    placeholders: {'me': 'id', ':id': 'id'},
    paths: [
      `/${config.apiPath}/users/me`,
      `/${config.apiPath}/${config.adminPath}/users?*`
    ]
  })
  async updateUser(
    @Param('id', new ParseIntPipe()) id,
    @Body() updateProfileDto: any
  ): Promise<User> {
    const user = await this.userService.updateById(id, updateProfileDto);
    if (!user) throw new NotFoundException();
    return user;
  }
}
