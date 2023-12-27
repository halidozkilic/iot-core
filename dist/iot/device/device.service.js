"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("./device.entity");
const command_entity_1 = require("../command/command.entity");
let DevicesService = class DevicesService {
    constructor(deviceRepository, commandRepository, communicationAdapter, deviceFactory, databaseAdapter) {
        this.deviceRepository = deviceRepository;
        this.commandRepository = commandRepository;
        this.communicationAdapter = communicationAdapter;
        this.deviceFactory = deviceFactory;
        this.databaseAdapter = databaseAdapter;
        this.observers = [];
    }
    async getAllDevices() {
        return this.databaseAdapter.getDevices();
    }
    async getDeviceById(id) {
        return this.databaseAdapter.getDeviceById(id);
    }
    async registerDevice(type, status, data) {
        const newDevice = this.deviceFactory.createDevice(type, status, data);
        const savedDevice = await this.databaseAdapter.saveDevice(newDevice);
        this.notifyObservers(savedDevice);
        return savedDevice;
    }
    notifyObservers(device) {
        this.observers.forEach((observer) => observer.update(device));
    }
    update(device) {
        console.log(`Device updated: ${device.type} - ${device.status}`);
    }
    async createCommand(deviceId, createCommandDto) {
        const device = await this.getDeviceById(deviceId);
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        const command = new command_entity_1.Command();
        command.device = device;
        command.type = createCommandDto.type;
        command.payload = createCommandDto.payload;
        return this.commandRepository.save(command);
    }
    async updateCommand(deviceId, commandId, updateCommandDto) {
        const device = await this.getDeviceById(deviceId);
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        const command = await this.commandRepository.findOneBy({ id: commandId, device });
        if (!command) {
            throw new common_1.NotFoundException('Command not found');
        }
        Object.assign(command, updateCommandDto);
        return this.commandRepository.save(command);
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(command_entity_1.Command)),
    __param(2, (0, common_1.Inject)('CommunicationAdapter')),
    __param(3, (0, common_1.Inject)('DeviceFactory')),
    __param(4, (0, common_1.Inject)('DatabaseAdapter')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object, Object])
], DevicesService);
//# sourceMappingURL=device.service.js.map