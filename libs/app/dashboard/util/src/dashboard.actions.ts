import { user_profile } from "@mp/api/profiles/util";

export class SetPosts {
    static readonly type = '[Dashboard] SetPosts';
    constructor(public readonly user: user_profile | null) {}
}