import { Device } from './device.entity';
export interface DeviceFactory {
    createDevice(type: string, status: string, data?: any): Partial<Device>;
}
