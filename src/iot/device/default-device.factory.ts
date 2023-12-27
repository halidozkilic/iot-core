import { Injectable } from '@nestjs/common';
import { DeviceFactory } from './device-factory.interface';
import { Device } from './device.entity';

@Injectable()
export class DefaultDeviceFactory implements DeviceFactory {
    createDevice(type: string, status: string, data?: any): Partial<Device> {
        return {
            type,
            status,
            data,
        };
    }
}
