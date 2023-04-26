import { user_profile } from "@mp/api/profiles/util";

export class SetDashboardPosts {
    static readonly type = '[Dashboard] SetDashboardPosts';
    constructor(public readonly profile: user_profile | null) {}
}