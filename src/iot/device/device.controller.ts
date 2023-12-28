import {Body, Controller, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import { DevicesService } from './device.service';
import { Device } from './device.entity';
import {Command} from "../command/command.entity";
import {CreateCommandDto} from "../command/command.dto";
import {CloseAllCommand} from "../command/close-all-command.imp";
import { CommandInvoker } from '../command/command-invoker';
import {UpdateDeviceDto} from "./update-device.dto";


@Controller('iot')
export class DeviceController {
    private commandInvoker = new CommandInvoker();
    constructor(private readonly devicesService: DevicesService) {}

    @Get('devices')
    getAllDevices(): Promise<Device[]> {
        return this.devicesService.getAllDevices();
    }

    @Get('devices/:id')
    getDeviceById(@Param('id') id: string): Promise<Device> {
        return this.devicesService.getDeviceById(id);
    }

    @Post('devices')
    async registerDevice(@Body() device: Device): Promise<Device> {
        return this.devicesService.registerDevice(device.type, device.status, device.data);
    }
    @Post(':id/update-device')
    async updateDeviceById(
        @Param('id') deviceId: string,
        @Body() updateDeviceDto: UpdateDeviceDto,
    ): Promise<Device> {
        return this.devicesService.updateDevice(deviceId, updateDeviceDto)
    }

    @Post(':id/commands')
    createCommand(@Param('id') id: string, @Body() createCommandDto: CreateCommandDto): Promise<Command> {
        return this.devicesService.createCommand(id, createCommandDto);
    }

    @Patch(':id/commands/:commandId')
    updateCommand(
        @Param('id') id: string,
        @Param('commandId') commandId: string,
        @Body() updateCommandDto: CreateCommandDto,
    ): Promise<Command> {
        return this.devicesService.updateCommand(id, commandId, updateCommandDto);
    }

    @Post('close-all')
    closeAllDevices(): void {
        const closeAllCommand = new CloseAllCommand(this.devicesService);
        this.commandInvoker.setCommand(closeAllCommand);
        this.commandInvoker.executeCommand();
    }
}
