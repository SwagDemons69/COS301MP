import { Injectable } from '@angular/core';
import {
  edit_profile,
  user_profile,
  EditProfileRequest,
  EditProfileResponse
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
  Logout,
  SetProfile,
  SubscribeToProfile,
  SubscribeToProfilePosts,
  SetPosts,
  EditProfile,
  InitForm,
  GetImages
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { MessagesApi } from './messages.api';
import produce from 'immer';
import { post } from '@mp/api/home/util';
import { doc } from '@firebase/firestore';
import { user } from 'firebase-functions/v1/auth';


// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface ProfileStateModel {
//   profile: user_profile | null;
//   form : edit_profile | null;
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface PostStateModel{
//   posts : post | null
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface EditProfileModel{
//   user_id : string;
//   profile : edit_profile | null;
// }

// @State<ProfileStateModel>({
//   name: 'profile',
//   defaults: {
//     profile: {
//       user_id: "",
//       timeOfExpiry: 0,
//       notPublic: "",
//       username: "",
//       name: "",
//       profilePicturePath: "",
//       bio: "",
//       email: "",
//       password: "",
//       province: "",
//       likesLeft: 0,
//       dislikesLeft: 0,
//       commentLikesLeft: 0,
//       followers: [], //Array of user_id
//       following: [], //Array of user_id
//       blocked: [],    //Array of user_id
//       posts: [],  //Array of post_id
//       notifications: [], //Array of notification_id
//     },
//     form : {
//       notPublic : "",
//       name : "",
//       username : "",
//       profilePicturePath : "",
//       bio : "",
//       province : ""
//     }
//   }
// })

// @State<PostStateModel>({
//   name : 'posts',
//   defaults: {
//     posts : null
//   }
// })


// @State<EditProfileModel>({
//   name : 'EditProfile',
//   defaults: {
//     user_id : "",
//     profile : null
//   }
// })


@Injectable()
export class MessagesState {
  //follower : number;
  constructor(
    private readonly profileApi: MessagesApi,
    private readonly store: Store,
  ) { }
}


//   @Selector()
//   static profile(state: ProfileStateModel) {
//     return state.profile;
//   }

//   @Selector()
//   static form(state : ProfileStateModel){
//     return state.form;
//   }

//   @Selector()
//   static posts(state : PostStateModel){
//     return state.posts;
//   }

//   @Action(Logout)
//   async logout(ctx: StateContext<ProfileStateModel>) {
//     return ctx.dispatch(new AuthLogout());
//   }

//   @Action(SubscribeToProfile)
//   subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
//     const user = this.store.selectSnapshot(AuthState.user);
//     if (!user) return ctx.dispatch(new SetError('User not set'));
//     const defaultForm: edit_profile = {
//       notPublic : "",
//       name : "",
//       username : "",
//       profilePicturePath : "",
//       bio : "",
//       province : ""
//     };

//     ctx.dispatch(new InitForm(defaultForm))

//     return this.profileApi
//       .profile$(user.uid)
//       .pipe(tap((profile: user_profile) => ctx.dispatch(new SetProfile(profile))));
//   }
//   //What does piping do?
//   //I think when profile api retuerns it is stored in profile of type user_profile and on completion of this 
//   //the set profile action is invoked
  
//   @Action(SetProfile)
//   setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
//     return ctx.setState(
//       produce((draft) => {
//         draft.profile = profile;
//       })
//     );
//   }

//   @Action(InitForm)
//   InitForm(ctx: StateContext<ProfileStateModel>, { form }: InitForm){
//   console.log("INIT FORM")
//   console.log(ctx.getState().form)
//   return ctx.setState(
//     produce((draft) => {
//       draft.form=form;
//     })
//   );
//   }


// //============================================================================================

//   @Action(SubscribeToProfilePosts)
//   subscribeToProfilePosts(ctx: StateContext<PostStateModel>) {
//     const user = this.store.selectSnapshot(AuthState.user);
//     if (!user) return ctx.dispatch(new SetError('User not set'));
    
//     return this.profileApi
//       .posts$(user.uid).pipe(tap((posts : post) => ctx.dispatch(new SetPosts(posts))));
//   }


//   @Action(SetPosts)
//   setPosts(ctx: StateContext<PostStateModel>, { posts }: SetPosts) {
//     console.log("SET POST")
//     return ctx.setState(
//       produce((draft) => {
//         draft.posts = posts;
//       })
//     );
//   }

// getUserId(){
//   const user = this.store.selectSnapshot(AuthState.user);
//   return user?.uid;
// }

// //Sort out user_id
// @Action(EditProfile)
// async EditProfile(ctx: StateContext<ProfileStateModel>){
//   //Get state
//   const state = ctx.getState().profile;
//   const formState = ctx.getState().form;
//   //Ensure state is set
//   if(state == undefined || formState == undefined){
//     return;
//   }
//   try{

  
//       //const formState = ctx.getState().form;
//       const user_id = state.user_id; 
//       const notPublic = formState.notPublic;
//       const name = formState.name;
//       const username = formState.username;
//       const profilePicturePath = formState.profilePicturePath;
//       const bio = formState.bio;
//       const province = formState.province;

//       //Maybe some data validation

//       const request: EditProfileRequest = {
//         user_id : user_id,
//         profile : {
//           notPublic,
//           name,
//           username,
//           profilePicturePath,
//           bio,
//           province
//         }
//       };
//       const responseRef = await this.profileApi.EditProfile(request);
//       const response = responseRef.data;
//       //Do we want to update profile state
//       return ctx.dispatch(new SetProfile(response.profile));

//   }
//   catch (error) {
//        return ctx.dispatch(new SetError((error as Error).message));
//      }
