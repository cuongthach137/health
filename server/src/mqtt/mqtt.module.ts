import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { DeviceModule } from 'src/device/device.module';
import { PatientModule } from 'src/patient/patient.module';
import { NotificationModule } from 'src/notification/notification.module';
import { OrmModule } from 'src/orm/orm.module';
import { MedicalStatModule } from 'src/medical-stat/medical-stat.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    OrmModule,
    DeviceModule,
    PatientModule,
    NotificationModule,
    MedicalStatModule,
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
