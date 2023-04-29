import { userInterface } from "/util/src/interfaces/user";


export class NotificationCreatedEvent{
constructor(public readonly user: UserInterface)
{ }
}
