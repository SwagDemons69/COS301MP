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
  SubscribeToProfile,
  SubscribeToProfilePosts,
  SetPosts
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { ProfilesApi } from './profiles.api';
import produce from 'immer';
import { post } from '@mp/api/home/util';
import { doc } from '@firebase/firestore';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: user_profile | null;
}

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostStateModel{
  posts : post | null
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: {
      user_id: "",
      timeOfExpiry: 0,
      notPublic: "",
      username: "",
      name: "",
      profilePicturePath: "",
      bio: "",
      email: "",
      password: "",
      province: "",
      likesLeft: 0,
      dislikesLeft: 0,
      commentLikesLeft: 0,
      followers: [], //Array of user_id
      following: [], //Array of user_id
      blocked: [],    //Array of user_id
      posts: [],  //Array of post_id
      notifications: [], //Array of notification_id
    }
  }
})

@State<PostStateModel>({
  name : 'posts',
  defaults: {
    posts : null
  }
})


@Injectable()
export class ProfileState {
  //follower : number;
  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly store: Store,
  ) { }



  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static posts(state : PostStateModel){
    return state.posts;
  }

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToProfile)
  subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));
    //console.log("SUBSCRIBE TO PROFILE")
    //console.log("USER UID: " + user.uid)
    console.log(this.profileApi.profile$(user.uid));
    return this.profileApi
      .profile$(user.uid)
      .pipe(tap((profile: user_profile) => ctx.dispatch(new SetProfile(profile))));
  }
  //What does piping do?
  //I think when profile api retuerns it is stored in profile of type user_profile and on completion of this 
  //the set profile action is invoked
  
  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    return ctx.setState(
      produce((draft) => {
        draft.profile = profile;
      })
    );
  }

//============================================================================================

  @Action(SubscribeToProfilePosts)
  subscribeToProfilePosts(ctx: StateContext<PostStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));
    console.log("SUBSCRIBE PROFILE POST")
    
    return this.profileApi
      .posts$(user.uid).pipe(tap((posts : post) => ctx.dispatch(new SetPosts(posts))));
  }


  @Action(SetPosts)
  setPosts(ctx: StateContext<PostStateModel>, { posts }: SetPosts) {
    console.log("SET POST")
    return ctx.setState(
      produce((draft) => {
        draft.posts = posts;
      })
    );
  }




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
