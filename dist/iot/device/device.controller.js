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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const device_entity_1 = require("./device.entity");
const command_dto_1 = require("../command/command.dto");
let DeviceController = class DeviceController {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    getAllDevices() {
        return this.devicesService.getAllDevices();
    }
    getDeviceById(id) {
        return this.devicesService.getDeviceById(id);
    }
    async registerDevice(device) {
        return this.devicesService.registerDevice(device.type, device.status, device.data);
    }
    createCommand(id, createCommandDto) {
        return this.devicesService.createCommand(id, createCommandDto);
    }
    updateCommand(id, commandId, updateCommandDto) {
        return this.devicesService.updateCommand(id, commandId, updateCommandDto);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Get)('devices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getAllDevices", null);
__decorate([
    (0, common_1.Get)('devices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getDeviceById", null);
__decorate([
    (0, common_1.Post)('devices'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_entity_1.Device]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "registerDevice", null);
__decorate([
    (0, common_1.Post)(':id/commands'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, command_dto_1.CreateCommandDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "createCommand", null);
__decorate([
    (0, common_1.Patch)(':id/commands/:commandId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('commandId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, command_dto_1.CreateCommandDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "updateCommand", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('iot'),
    __metadata("design:paramtypes", [device_service_1.DevicesService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map