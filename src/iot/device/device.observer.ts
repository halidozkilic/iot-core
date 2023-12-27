import { Injectable } from '@nestjs/common';
import { Observer } from './observer.interface';
import { Device } from './device.entity';

@Injectable()
export class DeviceObserver implements Observer {
    update(device: Device): void {
        console.log(`Device ${device.id} has been updated. New status: ${device.status}`);
    }
}
