import { DevicesService } from './device.service';
import { Device } from './device.entity';
import { Command } from "../command/command.entity";
import { CreateCommandDto } from "../command/command.dto";
import { UpdateDeviceDto } from "./update-device.dto";
export declare class DeviceController {
    private readonly devicesService;
    private commandInvoker;
    constructor(devicesService: DevicesService);
    getAllDevices(): Promise<Device[]>;
    getDeviceById(id: string): Promise<Device>;
    registerDevice(device: Device): Promise<Device>;
    updateDeviceById(deviceId: string, updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    createCommand(id: string, createCommandDto: CreateCommandDto): Promise<Command>;
    updateCommand(id: string, commandId: string, updateCommandDto: CreateCommandDto): Promise<Command>;
    closeAllDevices(): void;
}
