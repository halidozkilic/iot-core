"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockCommunicationAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCommunicationAdapter = void 0;
const common_1 = require("@nestjs/common");
let MockCommunicationAdapter = MockCommunicationAdapter_1 = class MockCommunicationAdapter {
    constructor() {
        this.logger = new common_1.Logger(MockCommunicationAdapter_1.name);
    }
    async sendDataToDevice(device, data) {
        this.logger.log(`Mock data sent to device ${device.id}:`, data);
    }
};
exports.MockCommunicationAdapter = MockCommunicationAdapter;
exports.MockCommunicationAdapter = MockCommunicationAdapter = MockCommunicationAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], MockCommunicationAdapter);
//# sourceMappingURL=mock-communication.adapter.js.map