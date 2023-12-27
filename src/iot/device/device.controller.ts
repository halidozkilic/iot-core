import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { DevicesService } from './device.service';
import { Device } from './device.entity';
import {Command} from "../command/command.entity";
import {CreateCommandDto} from "../command/command.dto";

@Controller('iot')
export class DeviceController {
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
}
