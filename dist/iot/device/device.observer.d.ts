import { Observer } from './observer.interface';
import { Device } from './device.entity';
export declare class DeviceObserver implements Observer {
    update(device: Device): void;
}
