import { Device } from '../device/device.entity';
export declare class Command {
    id: string;
    type: string;
    payload: any;
    device: Device;
}
