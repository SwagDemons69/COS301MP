import { Test, TestingModule } from '@nestjs/testing';
import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatHeadersRequest, GetChatMessagesRequest, CreateChatMessageCommand, CreateChatMessageResponse, ChatHeadersQuery, ChatHeadersResponse, GetChatMessagesQuery, GetChatMessagesResponse, } from '@mp/api/chat/util';
import { CommandHandler, EventPublisher, ICommandHandler, QueryHandler, IQueryHandler, CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateChatMessageCommandHandler } from '../commands';
import { ChatHeadersQueryHandler, GetChatMessagesQueryHandler, } from "../queries";
import { CreateChatMessageEventHandler } from "../events";
import { Chat } from '../models';

describe('Chat', () => {
	let app: TestingModule;
	let repository: ChatRepository;
	let publisher: EventPublisher;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			providers: [
				ChatRepository,
				EventPublisher,
				CreateChatMessageCommandHandler,
				CreateChatMessageEventHandler,
				ChatHeadersQueryHandler,
				GetChatMessagesQueryHandler,
				{provide: EventBus, useValue : {}},
				{provide: CommandBus, useValue : {}},
			],
		}).compile();
		repository = app.get<ChatRepository>(ChatRepository);
		publisher = app.get<EventPublisher>(EventPublisher);
	});

	describe('CreateChatMessageCommandHandler', () => {
		it('should create and send a chat message', async () => {
			const sender = 'testUser1';
			const receiver = 'testUser2';
			const timeStamp = 'testTimestamp';
			const payload = 'hello, is this a test?';
			const newChatMessage = { sender, receiver, timeStamp, payload };
			const request = { sender, receiver, chat: newChatMessage };
			const command = new CreateChatMessageCommand(request);
			const handler = new CreateChatMessageCommandHandler(publisher, repository);

			const result = await handler.execute(command);

			expect(result).toBeDefined();
			expect(result.messages).toBeDefined();
			expect(result.messages.recipient).toBe(receiver);
			expect(result.messages.messages).toHaveLength(1);
			expect(result.messages.messages[0]).toMatchObject(newChatMessage);
		});
	});
});

