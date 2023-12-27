// src/iot/device/device.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from '../command/command.entity';
import { CommunicationAdapter } from '../adapter/communication-adapter.interface';
import { DeviceFactory } from './device-factory.interface';
import { Observer } from './observer.interface';
import { DatabaseAdapter } from '../adapter/db-adapter.interface';
import { DevicesService } from './device.service';
import { DeviceController } from './device.controller';
import { Device } from './device.entity';
import {MockCommunicationAdapter} from "../adapter/mock-communication.adapter";
import {TypeOrmDatabaseAdapter} from "../adapter/db-adapter.adapter";
import {DefaultDeviceFactory} from "./default-device.factory";

@Module({
    imports: [
        TypeOrmModule.forFeature([Device, Command]),
    ],
    providers: [
        DevicesService,
        {
            provide: 'CommunicationAdapter',
            useClass: MockCommunicationAdapter,
        },
        {
            provide: 'DeviceFactory',
            useClass: DefaultDeviceFactory,
        },
        {
            provide: 'DatabaseAdapter',
            // Provide the actual DatabaseAdapter implementation
            useClass: TypeOrmDatabaseAdapter,
        },
    ],
    controllers: [DeviceController],
    exports: [DevicesService],
})
export class DeviceModule {}
