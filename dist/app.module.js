"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const mock_communication_adapter_1 = require("./iot/adapter/mock-communication.adapter");
const default_device_factory_1 = require("./iot/device/default-device.factory");
const auth_service_1 = require("./iot/auth/auth.service");
const jwt_strategy_1 = require("./iot/auth/jwt.strategy");
const db_adapter_adapter_1 = require("./iot/adapter/db-adapter.adapter");
const auth_module_1 = require("./iot/auth/auth.module");
const device_module_1 = require("./iot/device/device.module");
const device_entity_1 = require("./iot/device/device.entity");
const user_module_1 = require("./iot/users/user.module");
const user_entity_1 = require("./iot/users/user.entity");
const command_entity_1 = require("./iot/command/command.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'halid',
                password: '12345',
                database: 'iot-core',
                entities: [user_entity_1.User, device_entity_1.Device, command_entity_1.Command],
                synchronize: true,
                autoLoadEntities: true,
                migrationsRun: true
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, device_entity_1.Device, command_entity_1.Command]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '60s' },
                }),
                inject: [config_1.ConfigService],
            }),
            device_module_1.DeviceModule,
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            passport_1.PassportModule,
        ],
        providers: [
            {
                provide: 'CommunicationAdapter',
                useClass: mock_communication_adapter_1.MockCommunicationAdapter,
            },
            {
                provide: 'DeviceFactory',
                useClass: default_device_factory_1.DefaultDeviceFactory,
            },
            {
                provide: 'DatabaseAdapter',
                useClass: db_adapter_adapter_1.TypeOrmDatabaseAdapter,
            },
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map