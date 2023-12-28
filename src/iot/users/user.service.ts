// src/auth/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }
}
