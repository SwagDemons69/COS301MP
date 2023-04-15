import { Module } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Module({
    providers: [MessagesRepository],
    exports: [MessagesRepository],
})
export class MessagesModule {}