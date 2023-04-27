import { Injectable } from '@angular/core';
import { post } from '@mp/api/home/util';
import { Selector, State, Store, Action, StateContext } from '@ngxs/store';
import { DashboardApi } from './dashboard.api';
import { SetDashboardPosts } from '@mp/app/dashboard/util';
import { GetRecommendedPostsRequest, GetTrendingPostsRequest } from '@mp/api/dashboard/util';

export interface DashboardStateModel {
  recommended_posts: post[] | [];
  trending_posts: post[] | [];
}

@State<DashboardStateModel>({
  name: 'posts',
  defaults: {
    recommended_posts: [],
    trending_posts: [],
  }
})
@Injectable()
export class DashboardState {
  constructor(
    private readonly dashboardApi: DashboardApi,
    private readonly store: Store,
  ) { }

  @Selector()
  static recommendedPosts(state: DashboardStateModel) {
    return state.recommended_posts;
  }

  @Selector()
  static trendingPosts(state: DashboardStateModel) {
    return state.trending_posts;
  }

  @Action(SetDashboardPosts)
  async setDashboardPosts(ctx: StateContext<DashboardStateModel>, { profile }: SetDashboardPosts) {
    console.log("Inside SetPosts");
    const trendingRequest: GetTrendingPostsRequest = {
      cutOffTime: 10,
    }
    const recommendedRequest: GetRecommendedPostsRequest = {
      // users: profile?.following,
      users: [] //TODO: check
    }
    ctx.patchState({ recommended_posts: (await this.dashboardApi.GetRecommendedPosts(recommendedRequest)).data.posts});
    ctx.patchState({ trending_posts: (await this.dashboardApi.GetTrendingPosts(trendingRequest)).data.posts});
  }

  // @Action(Logout)
  // async logout(ctx: StateContext<ProfileStateModel>) {
  //   return ctx.dispatch(new AuthLogout());
  // }

  // @Action(SubscribeToProfile)
  // subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
  //   const user = this.store.selectSnapshot(AuthState.user);
  //   if (!user) return ctx.dispatch(new SetError('User not set'));

  //   return this.dashboardApi
  //     .profile$(user.uid)  
  //     .pipe(tap((profile: user_profile) => ctx.dispatch(new SetProfile(profile))));
  // }

  // @Action(SetProfile)
  // setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
  //   if (profile?.followers) {
  //     this.follower = profile?.followers?.length;
  //   }
  //   else {
  //     this.follower = 69;
  //   }
  //   return ctx.setState(
  //     produce((draft) => {
  //       draft.profile = profile;
  //     })
  //   );

  // }


  // @Action(LoadProfile)
  // getFollowCount(): number {
  //   const user = this.store.selectSnapshot(AuthState.user);
  //   let profile2;
  //   if (user) {
  //     profile2 = this.profileApi.profile$(user?.uid);
  //   }
  //   let count = 2;
  //   profile2?.forEach((el) => {
  //     if (el.followers) {
  //       count = el.followers.length;
  //     }
  //   })
  //   return count;
  // }




  // function getFollowingCount() {
  //   return profile?.following?.length;
  // }



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
