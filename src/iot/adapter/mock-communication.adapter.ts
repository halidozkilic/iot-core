import { Injectable } from '@nestjs/common';
import { CommunicationAdapter } from './communication-adapter.interface';
import { Device } from '../device/device.entity';

@Injectable()
export class MockCommunicationAdapter implements CommunicationAdapter {
    async sendDataToDevice(device: Device, data: any): Promise<void> {
        console.log(`Mock data sent to device ${device.id}:`, data);
    }
}
