import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const _user = new User();
    Object.assign(_user, user);
    return await this.userRepository.save(_user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(+id);
    return user || null;
  }

  async findOne(user: any): Promise<User> {
    return await this.userRepository.findOne(user);
  }
}
