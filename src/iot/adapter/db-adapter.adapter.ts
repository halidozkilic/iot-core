import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../device/device.entity';
import { DatabaseAdapter } from './db-adapter.interface';

@Injectable()
export class TypeOrmDatabaseAdapter implements DatabaseAdapter {
    constructor(
        @InjectRepository(Device)
        private readonly deviceRepository: Repository<Device>,
    ) {}

    async saveDevice(device: Device): Promise<Device> {
        return this.deviceRepository.save(device);
    }

    async getDevices(): Promise<Device[]> {
        return this.deviceRepository.find();
    }

    async getDeviceById(id: string): Promise<Device | undefined> {
        return this.deviceRepository.findOneBy({id});
    }
}
