import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from "./user.entity";
export declare class UserController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginUserDto: CreateUserDto): Promise<User>;
    getProfile(req: any): any;
}
