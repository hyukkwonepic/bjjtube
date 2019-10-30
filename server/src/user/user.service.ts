import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponseDto, CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    return { user };
  }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.userRepository.save(user);
    return { user: createdUser };
  }
}
