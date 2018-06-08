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
  @CacheOptions({userReplace: 'me'})
  async findUserProfile(@Req() request): Promise<User> {
    return this.userService.findById(request.user.id);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(CacheCleanerInterceptor)
  @CacheOptions({userReplace: 'me'})
  async updateUserProfile(@Req() request, @Body() updateProfileDto: UpdateUserProfileDto): Promise<User> {
    return this.userService.updateById(request.user.id, updateProfileDto);
  }

  // ADMIN

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  @UseInterceptors(CacheInterceptor)
  async findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
