import { Injectable, Logger } from '@nestjs/common';
import { CommunicationAdapter } from './communication-adapter.interface';
import { Device } from '../device/device.entity';

@Injectable()
export class MockCommunicationAdapter implements CommunicationAdapter {
  private readonly logger = new Logger(MockCommunicationAdapter.name);
  async sendDataToDevice(device: Device, data: any): Promise<void> {
    this.logger.log(`Mock data sent to device ${device.id}:`, data);
  }
}
