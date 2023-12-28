import {Controller, Post, Body, BadRequestException, Get, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import {User} from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersService.findOne(createUserDto.username);
        if (user) throw new BadRequestException('User already exist');

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.usersService.create({ ...createUserDto, password: hashedPassword });
    }

    @Post('login')
    async login(@Body() loginUserDto: CreateUserDto): Promise<User> {
        const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const token =  await this.authService.login(user);
        user.token = token;
        return this.usersService.create(user)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}
