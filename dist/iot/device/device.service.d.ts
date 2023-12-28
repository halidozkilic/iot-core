import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { Command } from '../command/command.entity';
import { CommunicationAdapter } from '../adapter/communication-adapter.interface';
import { DeviceFactory } from './device-factory.interface';
import { Observer } from './observer.interface';
import { DatabaseAdapter } from '../adapter/db-adapter.interface';
import { CreateCommandDto } from '../command/command.dto';
import { UpdateDeviceDto } from "./update-device.dto";
export declare class DevicesService implements Observer {
    private readonly deviceRepository;
    private readonly commandRepository;
    private readonly communicationAdapter;
    private readonly deviceFactory;
    private readonly databaseAdapter;
    private observers;
    constructor(deviceRepository: Repository<Device>, commandRepository: Repository<Command>, communicationAdapter: CommunicationAdapter, deviceFactory: DeviceFactory, databaseAdapter: DatabaseAdapter);
    getAllDevices(): Promise<Device[]>;
    getDeviceById(id: string): Promise<Device | undefined>;
    registerDevice(type: string, status: string, data?: any): Promise<Device>;
    private notifyObservers;
    update(device: Device): void;
    updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    createCommand(deviceId: string, createCommandDto: CreateCommandDto): Promise<Command>;
    updateCommand(deviceId: string, commandId: string, updateCommandDto: CreateCommandDto): Promise<Command>;
    closeAllDevices(): Promise<void>;
}
