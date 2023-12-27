import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MockCommunicationAdapter } from './iot/adapter/mock-communication.adapter';
import { DefaultDeviceFactory } from './iot/device/default-device.factory';
import { AuthService } from './iot/auth/auth.service';
import { JwtStrategy } from './iot/auth/jwt.strategy';
import { TypeOrmDatabaseAdapter } from './iot/adapter/db-adapter.adapter';
import { AuthModule } from './iot/auth/auth.module';
import { DeviceModule } from './iot/device/device.module';
import { Device } from './iot/device/device.entity';
import { UsersModule } from './iot/users/user.module';
import { User } from './iot/users/user.entity';
import { Command } from './iot/command/command.entity'; // Import the TypeOrmDatabaseAdapter

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'iot-core',
      entities: [User, Device, Command],
      synchronize: true,
      autoLoadEntities: true,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([User, Device, Command]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    DeviceModule,
    UsersModule,
    AuthModule,
    PassportModule,
  ],
  providers: [
    {
      provide: 'CommunicationAdapter',
      useClass: MockCommunicationAdapter,
    },
    {
      provide: 'DeviceFactory',
      useClass: DefaultDeviceFactory,
    },
    {
      provide: 'DatabaseAdapter',
      useClass: TypeOrmDatabaseAdapter,
    },
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
