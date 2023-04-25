import { AddPhotoRequest } from '../requests';

export class AddPhotoCommand {
  constructor(public readonly request: AddPhotoRequest) {}
}