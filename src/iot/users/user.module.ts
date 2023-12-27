// src/iot/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller'; // Import the UserController
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController], // Include UserController here
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
