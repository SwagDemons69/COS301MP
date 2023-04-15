import { MessagesModule as MessagesDataAccessModule } from '@mp/api/messages/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    SendMessageHandler
}