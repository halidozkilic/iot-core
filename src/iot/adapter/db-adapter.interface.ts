import { Device } from '../device/device.entity';

export interface DatabaseAdapter {
    saveDevice(device: Partial<Device>): Promise<Device>;
    getDevices(): Promise<Device[]>;
    getDeviceById(id: string): Promise<Device | undefined>;
}
