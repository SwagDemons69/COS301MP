import { Injectable } from '@angular/core';
import {
  user_profile
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
  Logout,
  SetProfile,
  SubscribeToProfile
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { ProfilesApi } from './profiles.api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: user_profile | null;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: {
      user_id: "",
      time_of_expiry: 0,
      non_public: "",
      user_name: "",
      name_and_surname: "",
      user_profile_photo: "",
      user_bio: "",
      passwordHash: "",
      province: "",
      following_count: 0,
      follower_count: 0,
      followers: [], //Array of UserId
      following: [], //Array of UserId
      blocked_users: [],
      post_count: 0,
      posts: [],  //Array of PostId
      likes_for_day: 0,
      dislikes_for_day: 0,
      comments_for_day: 0,
      notifications: []
    }
  }
})
@Injectable()
export class ProfileState {
  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly store: Store
  ) { }

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToProfile)
  subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.profileApi
      .profile$(user.uid)
      .pipe(tap((profile: user_profile) => ctx.dispatch(new SetProfile(profile))));
  }

  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    return ctx.setState(
      produce((draft) => {
        draft.profile = profile;
      })
    );
  }

  // @Action(UpdateAccountDetails)
  // async updateAccountDetails(ctx: StateContext<ProfileStateModel>) {
  //   try {
  //     const state = ctx.getState();
  //     const userId = state.profile?.userId;
  //     const displayName = state.accountDetailsForm.model.displayName;
  //     const email = state.accountDetailsForm.model.email;
  //     // const photoURL = state.accountDetailsForm.model.photoURL;
  //     const password = state.accountDetailsForm.model.password;

  //     if (!userId || !displayName || !email || !password)
  //       return ctx.dispatch(
  //         new SetError(
  //           'UserId or display name or email or photo URL or password not set'
  //         )
  //       );

  //     const request: IUpdateAccountDetailsRequest = {
  //       profile: {
  //         userId,
  //         accountDetails: {
  //           displayName,
  //           email,
  //           password,
  //         },
  //       },
  //     };
  //     const responseRef = await this.profileApi.updateAccountDetails(request);
  //     const response = responseRef.data;
  //     return ctx.dispatch(new SetProfile(response.profile));
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }

  // @Action(UpdateContactDetails)
  // async updateContactDetails(ctx: StateContext<ProfileStateModel>) {
  //   try {
  //     const state = ctx.getState();
  //     const userId = state.profile?.userId;
  //     const cellphone = state.contactDetailsForm.model.cellphone;

  //     if (!userId || !cellphone)
  //       return ctx.dispatch(new SetError('UserId or cellphone not set'));

  //     const request: IUpdateContactDetailsRequest = {
  //       profile: {
  //         userId,
  //         contactDetails: {
  //           cellphone,
  //         },
  //       },
  //     };
  //     const responseRef = await this.profileApi.updateContactDetails(request);
  //     const response = responseRef.data;
  //     return ctx.dispatch(new SetProfile(response.profile));
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }

  // @Action(UpdateAddressDetails)
  // async updateAddressDetails(ctx: StateContext<ProfileStateModel>) {
  //   try {
  //     const state = ctx.getState();
  //     const userId = state.profile?.userId;
  //     const residentialArea = state.addressDetailsForm.model.residentialArea;
  //     const workArea = state.addressDetailsForm.model.workArea;

  //     if (!userId || !residentialArea || !workArea)
  //       return ctx.dispatch(
  //         new SetError('UserId or residential area or work area not set')
  //       );

  //     const request: IUpdateAddressDetailsRequest = {
  //       profile: {
  //         userId,
  //         addressDetails: {
  //           residentialArea,
  //           workArea,
  //         },
  //       },
  //     };
  //     const responseRef = await this.profileApi.updateAddressDetails(request);
  //     const response = responseRef.data;
  //     return ctx.dispatch(new SetProfile(response.profile));
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }

  // @Action(UpdatePersonalDetails)
  // async updatePersonalDetails(ctx: StateContext<ProfileStateModel>) {
  //   try {
  //     const state = ctx.getState();
  //     const userId = state.profile?.userId;
  //     const age = state.personalDetailsForm.model.age;
  //     const gender = state.personalDetailsForm.model.gender;
  //     const ethnicity = state.personalDetailsForm.model.ethnicity;

  //     if (!userId || !age || !gender || !ethnicity)
  //       return ctx.dispatch(
  //         new SetError('UserId or age or gender or ethnicity not set')
  //       );

  //     const request: IUpdatePersonalDetailsRequest = {
  //       profile: {
  //         userId,
  //         personalDetails: {
  //           age,
  //           gender,
  //           ethnicity,
  //         },
  //       },
  //     };
  //     const responseRef = await this.profileApi.updatePersonalDetails(request);
  //     const response = responseRef.data;
  //     return ctx.dispatch(new SetProfile(response.profile));
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }

  // @Action(UpdateOccupationDetails)
  // async updateOccupationDetails(ctx: StateContext<ProfileStateModel>) {
  //   try {
  //     const state = ctx.getState();
  //     const userId = state.profile?.userId;
  //     const householdIncome = state.occupationDetailsForm.model.householdIncome;
  //     const occupation = state.occupationDetailsForm.model.occupation;

  //     if (!userId || !householdIncome || !occupation)
  //       return ctx.dispatch(
  //         new SetError('UserId or householdIncome or occupation not set')
  //       );

  //     const request: IUpdateOccupationDetailsRequest = {
  //       profile: {
  //         userId,
  //         occupationDetails: {
  //           householdIncome,
  //           occupation,
  //         },
  //       },
  //     };
  //     const responseRef = await this.profileApi.updateOccupationDetails(
  //       request
  //     );
  //     const response = responseRef.data;
  //     return ctx.dispatch(new SetProfile(response.profile));
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }
}
