import { Repository } from 'typeorm';
import { Device } from '../device/device.entity';
import { DatabaseAdapter } from './db-adapter.interface';
export declare class TypeOrmDatabaseAdapter implements DatabaseAdapter {
    private readonly deviceRepository;
    constructor(deviceRepository: Repository<Device>);
    saveDevice(device: Device): Promise<Device>;
    getDevices(): Promise<Device[]>;
    getDeviceById(id: string): Promise<Device | undefined>;
}
