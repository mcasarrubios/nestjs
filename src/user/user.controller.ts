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
import { CacheOptions, CacheInterceptor, CacheCleanerInterceptor } from '../cache/index';
import { config } from '../../config/index';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(CacheInterceptor)
  @CacheOptions({placeholders: {'me': 'userId'}})
  async findUserProfile(@Req() request): Promise<User> {
    return this.userService.findById(request.user.id);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(CacheCleanerInterceptor)
  @CacheOptions({
    placeholders: {'me': 'userId', ':id': 'userId'},
    paths: [
      `/${config.apiPath}/${config.adminPath}/users/:id`,
      `/${config.apiPath}/${config.adminPath}/users?*`
    ]
  })
  async updateUserProfile(@Req() request, @Body() updateProfileDto: UpdateUserProfileDto): Promise<User> {
    return this.userService.updateById(request.user.id, updateProfileDto);
  }

}
