import { Injectable } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { Observable, map } from "rxjs";
import { MessageReceivedEvent } from '@mp/api/messages/util';

@Injectable
export class MessagesSagas {
    @Saga()
    onMessageReceived = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(MessageReceivedEvent),
            map(
                (event: MessageReceivedEvent) =>
                    new 
            )
        );
    };

    @Saga() 
    onMessageSent = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(MessageReceivedEvent),
            map(
                (event: MessageReceivedEvent) =>
            )
        );

    };

    @Saga()
    onContactsSearched = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            
        );
    };

    @Saga()
    onChatHistoryGet = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
        );
    };

    @Saga()
    onContactsGet = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
        );
    };

    @Saga()
    onAllChatsGet = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
        );
    };

}