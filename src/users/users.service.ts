import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ name }: CreateUserDto): Promise<User> {
    return await this.userRepository.save(new User(name)).catch((e) => {
      throw new InternalServerErrorException(
        `Failed to create user: ${e.message}`,
      );
    });
  }
}
