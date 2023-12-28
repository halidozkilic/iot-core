import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { Command } from '../command/command.entity';
import { CommunicationAdapter } from '../adapter/communication-adapter.interface';
import { DeviceFactory } from './device-factory.interface';
import { Observer } from './observer.interface';
import { DatabaseAdapter } from '../adapter/db-adapter.interface'; // Import DatabaseAdapter
import { CreateCommandDto } from '../command/command.dto';
import { MockCommunicationAdapter } from '../adapter/mock-communication.adapter';
import {CloseAllCommand} from "../command/close-all-command.imp";
import {UpdateDeviceDto} from "./update-device.dto";

@Injectable()
export class DevicesService implements Observer {
  private observers: Observer[] = [];

  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(Command)
    private readonly commandRepository: Repository<Command>,
    @Inject('CommunicationAdapter')
    private readonly communicationAdapter: CommunicationAdapter,
    @Inject('DeviceFactory')
    private readonly deviceFactory: DeviceFactory,
    @Inject('DatabaseAdapter')
    private readonly databaseAdapter: DatabaseAdapter // Inject DatabaseAdapter
  ) {}

  async getAllDevices(): Promise<Device[]> {
    return this.databaseAdapter.getDevices(); // Use DatabaseAdapter
  }

  async getDeviceById(id: string): Promise<Device | undefined> {
    return this.databaseAdapter.getDeviceById(id); // Use DatabaseAdapter
  }

  async registerDevice(
    type: string,
    status: string,
    data?: any
  ): Promise<Device> {
    const newDevice = this.deviceFactory.createDevice(type, status, data);
    const savedDevice = await this.databaseAdapter.saveDevice(newDevice); // Use DatabaseAdapter

    this.notifyObservers(savedDevice);
    return savedDevice;
  }

  private notifyObservers(device: Device): void {
    this.observers.forEach((observer) => observer.update(device));
  }

  update(device: Device): void {
    // Handle device updates (e.g., notify clients, log changes)
    console.log(`Device updated: ${device.type} - ${device.status}`);
  }

  async updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.getDeviceById(deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    // Update device properties based on the DTO
    if (updateDeviceDto.data) {
      device.data = updateDeviceDto.data;
    }

    if (updateDeviceDto.status) {
      device.status = updateDeviceDto.status;
    }

    return this.deviceRepository.save(device);
  }

  async createCommand(
    deviceId: string,
    createCommandDto: CreateCommandDto
  ): Promise<Command> {
    const device = await this.getDeviceById(deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    const command = new Command();
    command.device = device;
    command.type = createCommandDto.type;
    command.payload = createCommandDto.payload;

    await this.communicationAdapter.sendDataToDevice(device, command.payload);

    return this.commandRepository.save(command);
  }

  async updateCommand(
    deviceId: string,
    commandId: string,
    updateCommandDto: CreateCommandDto
  ): Promise<Command> {
    const device = await this.getDeviceById(deviceId);
    if (!device) {
      // Handle device not found
      throw new NotFoundException('Device not found');
    }

    const command = await this.commandRepository.findOneBy({
      id: commandId,
      device,
    });
    if (!command) {
      // Handle command not found
      throw new NotFoundException('Command not found');
    }

    Object.assign(command, updateCommandDto);

    return this.commandRepository.save(command);
  }

  async closeAllDevices(): Promise<void> {
    const allDevices = await this.deviceRepository.find();

    for (const device of allDevices) {
      device.status = 'close';
      await this.deviceRepository.save(device);
      await this.communicationAdapter.sendDataToDevice(device,{status: "close"})
      console.log('device:',device)
    }
  }
}
