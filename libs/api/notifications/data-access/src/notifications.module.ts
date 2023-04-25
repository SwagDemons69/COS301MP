import { Module } from '@nestjs/common';
import { NotificationRepository } from './notifications.repository';

@Module({
    providers: [NotificationRepository],
    exports: [NotificationRepository],
})
export class NotificationModule {}
