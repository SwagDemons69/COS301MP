import { user_profile } from '@mp/api/profiles/util';

export class SetPosts {
    static readonly type = '[Dashboard] SetPosts';
    constructor(public readonly profile: user_profile | null) {}
}