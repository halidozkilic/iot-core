import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from '../device/device.entity';

@Entity()
export class Command {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column('jsonb', { nullable: true })
    payload: any;

    @ManyToOne(() => Device, (device) => device.commands)
    @JoinColumn({ name: 'device_id' })
    device: Device;
}
