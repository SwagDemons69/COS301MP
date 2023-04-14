import { EditProfileRequest } from "../requests";


export class EditProfileCommand {
  constructor(public readonly request: EditProfileRequest) {}
}
