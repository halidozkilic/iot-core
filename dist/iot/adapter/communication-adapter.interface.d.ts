import { Device } from '../device/device.entity';
export interface CommunicationAdapter {
    sendDataToDevice(device: Device, data: any): Promise<void>;
}
