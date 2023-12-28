import { CommunicationAdapter } from './communication-adapter.interface';
import { Device } from '../device/device.entity';
export declare class MockCommunicationAdapter implements CommunicationAdapter {
    private readonly logger;
    sendDataToDevice(device: Device, data: any): Promise<void>;
}
