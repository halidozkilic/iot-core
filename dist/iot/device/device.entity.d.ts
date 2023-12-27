import { Command } from '../command/command.entity';
export declare class Device {
    id: string;
    type: string;
    status: string;
    data: any;
    commands: Command[];
}
