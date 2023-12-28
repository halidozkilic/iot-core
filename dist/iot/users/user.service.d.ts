import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    create(user: Partial<User>): Promise<User>;
    update(user: Partial<User>): Promise<User>;
}
