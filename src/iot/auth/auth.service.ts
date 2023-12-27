// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOne(username)
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }

        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.id };
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
