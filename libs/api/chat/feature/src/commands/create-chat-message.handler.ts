import { ChatRepository } from '@mp/api/chat/data-access';
import { CreateChatMessageCommand, CreateChatMessageResponse } from '@mp/api/chat/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Chat } from '../models';

@CommandHandler(CreateChatMessageCommand)
export class CreateChatMessageCommandHandler
  implements
    ICommandHandler<CreateChatMessageCommand, CreateChatMessageResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ChatRepository
  ) {}

  async execute(command: CreateChatMessageCommand) {
    console.log(`${CreateChatMessageCommandHandler.name}`);

    const request = command.request;
    const newChatMessage = request.chat;
    
    const chat = this.publisher.mergeObjectContext( Chat.createChatBlueprint() );
    
    chat.manageChatMessage(newChatMessage);
    
    //Get messages before I sent - idk
    const messages = await this.repository.getChatMessages(request.sender, request.receiver);

    // //Add new message to chat f or client side
    // messages.messages.messages.push(newChatMessage);

    //Send message to recipient - Creates Event
    chat.sendChat();

    //Dont remove - Sends Event
    chat.commit();

    //Return client side view to client messages tab
    //Call getMessages to get new messages - wont work trying to update it "client side"
    return { messages: {recipient: request.receiver, messages: messages.messages } } ;
  }
}