import { Device } from './device.entity';
export interface Observer {
    update(device: Device): void;
}
