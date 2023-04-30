import { Component, Renderer2 } from '@angular/core';
import { user_profile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app/blip/feature';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { post } from '@mp/api/home/util';
import { Observable } from 'rxjs';
import { DashboardState} from '@mp/app/dashboard/data-access';
import { SetDashboardPosts } from '@mp/app/dashboard/util';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';
import { DashboardApi } from '@mp/app/dashboard/data-access';
import { ProfileOtherComponent } from '@mp/app/profile-other/feature';
import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { SearchApi } from '@mp/app/dashboard/data-access';
import { Post, User } from '@mp/api/search/util';
import { PostHeader } from '@mp/api/dashboard/util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'ms-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage { 
  KronosTimer = KronosTimer;
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(DashboardState.recommendedPosts) recommended_posts$!: Observable<PostHeader[] | []>;
  @Select(DashboardState.trendingPosts) trending_posts$!: Observable<PostHeader[] | []>;

  //Local Vars
  profile: user_profile | null
  recommended: PostHeader[] | []
  trending: PostHeader[] | []
  //let called = false;
  deathTime: number
  constructor (
    private renderer: Renderer2,
    private modalController: ModalController,
    private store : Store,
    private readonly searchApi : SearchApi,
    private readonly api: DashboardApi,
    private readonly nav: NavController
  ) 
  {
    this.profile = null;
    this.profile$.forEach((profile)=> {
      this.profile = profile;
      this.deathTime = (this.profile) ? this.profile.timeOfExpiry : 1234567;
    });

    this.deathTime = 0;
  
    this.recommended = [];
    this.recommended_posts$.forEach((posts) => {
      console.log(posts);
      this.recommended = posts;
      this.recommended = this.recommended.sort((a, b) => (a.timeStamp < b.timeStamp ? 1 : -1));
      this.recommended = this.recommended.slice(0, 3);
    });
    
    // console.log("Recommended posts");
    // console.log(this.recommended);

    this.trending = [];
    this.trending_posts$.forEach((posts) => {
      // console.log("Trending posts");
      // console.log(posts);
      this.trending = posts;
      this.trending.sort((a, b) => (a.post.likes < b.post.likes ? 1 : -1));
    })
    
  }

  //Load Current Profiles Time when you enter page
  // ionViewWillEnter(){
  //   this.deathTime = (this.profile) ? this.profile.timeOfExpiry : 1234567;
  // }

  ionViewDidEnter(){
    this.store.dispatch(new SetDashboardPosts(this.profile)); 
  }

// async dispatchProfile() {
//   this.profile$.subscribe((profile) => {
//     console.log("Dispatching profile");   
//     //Error? Yess, never get's called inside the state
//     console.log("Dispatched profile"); //Follow me real quick and I;ll show you where we
//   });
// }

async getRecommended() {
  const posts = await firstValueFrom(this.recommended_posts$);
  this.recommended = posts;
 // this.recommended.sort((a, b) => (a.timeStamp < b.timeStamp ? 1 : -1));
}

async getTrending() {
  const posts = await firstValueFrom(this.trending_posts$);
  this.trending = posts;
 // this.trending.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1));
}


  //Search required variables
  searchResultsPosts: Post[] = []

  searchResultsUsers: User[] = []

  isSearchbarVisible = false;
  userToggle = true;

  kronos = ""

  kronosTimer = setInterval(() => {
    const counter = this.deathTime - Date.now()/1000;
    this.kronos = KronosTimer.displayKronos(counter);
  }, 999)

  toggleSearchbar() {
    this.isSearchbarVisible = !this.isSearchbarVisible;
  }

  // Prevent re-setting css properties every scroll event
  isKronosBarVisible = false;
  onContentScroll(event: any) {
    const barKronos = document.querySelector(".barKronos");
    const smallAvatar = document.querySelector(".smallAvatar");

    if (event.detail.scrollTop > 220 && !this.isKronosBarVisible) {
      this.renderer.setStyle(barKronos, 'opacity', '1');
      this.renderer.setStyle(smallAvatar, 'width', '2em');
      this.renderer.setStyle(smallAvatar, 'height', '2em');
      this.renderer.setStyle(smallAvatar, 'opacity', '1');
      this.isKronosBarVisible = true;
    }
    else if (event.detail.scrollTop <= 220) {
      this.renderer.setStyle(barKronos, 'opacity', '0');
      this.renderer.setStyle(smallAvatar, 'opacity', '0');
      this.renderer.setStyle(smallAvatar, 'width', '0em');
      this.renderer.setStyle(smallAvatar, 'height', '0em');
      this.renderer.setStyle(document.querySelector(".glassyBackground"), 'top', `${0.5*event.detail.scrollTop}px`);
      this.isKronosBarVisible = false;
    }
    else if (event.detail.scrollTop <= 690) {
      this.renderer.setStyle(document.querySelector(".glassyBackground"), 'top', `${0.5*event.detail.scrollTop}px`);
      this.isKronosBarVisible = false;
    }
  }

  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      event.target.disabled = true;
    }, 2000);
  }

  // See [https://stackblitz.com/edit/ionic6-angular13-wnmgmu?file=src/app/app.component.ts] for reference
  async openBlip(data: post) {
    const metadata = await this.api.GetBlipContent({user: data.user_id, post: data.post_id});
    
    //Representation for metadata
    //{
      // username: string;
      // imageURL: string;
      // likes   : post_like[];
      // comments : RootComment[];
    //}
    //data passed is has all relevant post dat like its image, title, description
    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data,
        metadata: metadata.data //TODO: Change `dat` back to `data` once properly integrated
      }
    });

    // modal.onDidDismiss().then((data) => {
    //   console.log(data);
    // });

    return await modal.present();
  }
  
  async search(event: any){
    this.searchResultsUsers = []; // we should rather keep a state, Tumi will do this. (but this should be fine... for now)
    this.searchResultsPosts = []; //added this for you - Rob ;)
    const query = event.detail.value;
    const request : SearchRequest = {query : query};
    const response: SearchResponse = await this.searchApi.search(request);
    for(let i = 0; i < response.profiles.length; i++){
      this.searchResultsUsers.push(response.profiles[i]);
    }

    for(let i = 0; i < response.posts.length; i++){
      this.searchResultsPosts.push(response.posts[i]);
    }
  }

  toPost(username : any, postId : any){
    console.log(postId + " postsed by " + username);
  }

  toUser(user : any){
    this.openProfile(user);
  }

  toggleToUsers(){
    if(!this.userToggle){
      this.userToggle = !this.userToggle;
    }
  }

  toggleToPosts(){
    if(this.userToggle){
      this.userToggle = !this.userToggle;
    }
  }

  async openProfile(profileData: any) {
    const modal = await this.modalController.create({
      component: ProfileOtherComponent,
      componentProps: {profile: profileData}
    });

    return await modal.present();
  }

  viewNotifications(){
    this.nav.navigateForward('/home/notification');
  }
}
