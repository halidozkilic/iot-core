// close-all-command.impl.ts

import { Injectable } from '@nestjs/common';
import { Command } from './close-all-command.interface';
import { DevicesService } from '../device/device.service';

@Injectable()
export class CloseAllCommand implements Command {
    constructor(private readonly devicesService: DevicesService) {}

    execute(): void {
        this.devicesService.closeAllDevices();
    }
}
