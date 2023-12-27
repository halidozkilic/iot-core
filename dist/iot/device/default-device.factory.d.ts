import { DeviceFactory } from './device-factory.interface';
import { Device } from './device.entity';
export declare class DefaultDeviceFactory implements DeviceFactory {
    createDevice(type: string, status: string, data?: any): Partial<Device>;
}
