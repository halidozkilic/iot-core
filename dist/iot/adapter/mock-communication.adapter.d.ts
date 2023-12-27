import { CommunicationAdapter } from './communication-adapter.interface';
import { Device } from '../device/device.entity';
export declare class MockCommunicationAdapter implements CommunicationAdapter {
<<<<<<< HEAD
=======
    private readonly logger;
>>>>>>> a6a6a4e2 (latest)
    sendDataToDevice(device: Device, data: any): Promise<void>;
}
