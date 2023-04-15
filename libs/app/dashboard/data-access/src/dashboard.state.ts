import { Injectable } from '@angular/core';
import { Selector, State, Store, Action, StateContext } from '@ngxs/store';
import { DashboardApi } from './dashboard.api';
import { post } from '@mp/api/home/util';
import { SetPosts } from '@mp/app/dashboard/util';
export interface DashboardStateModel {
  posts: post[]
}

@State<DashboardStateModel>({
  name: 'posts',
  defaults: {
    posts: []
  }
})
@Injectable()
export class DashboardState {
  //follower : number;
  constructor(
    private readonly dashboardApi: DashboardApi,
    private readonly store: Store,
  ) { }

  @Selector()
  static posts(state: DashboardStateModel) {
    return state.posts;
  }

  @Action(SetPosts)
  async setPosts(ctx: StateContext<DashboardStateModel>) {
    this.dashboardApi.profiles$(["10398140"]).subscribe((profiles) => {
      console.log("Profile"); 
      console.log(profiles);
      console.log(profiles[0].posts);
    });
    console.log(this.dashboardApi.postsFromProfiles$(["10398140","8971892","4512312342"]));
    this.dashboardApi.posts$().subscribe((posts) => {
      console.log("Posts");
      console.log(posts);
      ctx.patchState({ posts: posts });
    })
  }


    //return ctx.patchState({posts: [this.dashboardApi.post$("1")]});

  // export interface post {
  //   post_id : string;
  //   user_id : string;
  //   content : string;
  //   caption : string;
  //   likes : number;
  //   timeStamp : number;
  //   shares : number;
  //   kronos : number;
  //   comments : string[];
  //   categories : string[];
  //   taggedUsers : string[];
  
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

