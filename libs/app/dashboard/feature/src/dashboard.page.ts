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
// import { SearchApi } from '@mp/app/dashboard/data-access';
import { ProfileOtherComponent } from '@mp/app/profile-other/feature';
import { KronosTimer } from '@mp/app/kronos-timer/kronos';
import { DashboardApi } from '@mp/app/dashboard/data-access';

@Component({
  selector: 'ms-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage { 
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(DashboardState.recommendedPosts) recommended_posts$!: Observable<post[] | []>;
  @Select(DashboardState.trendingPosts) trending_posts$!: Observable<post[] | []>;

  //Local Vars
  profile: user_profile | null
  recommended: post[] | []
  trending: post[] | []
  //let called = false;
  deathTime: number
  constructor (
    private renderer: Renderer2,
    private modalController: ModalController,
    private store : Store,
    private readonly api: DashboardApi
  ) 
  {
    this.profile = null;
    this.profile$.forEach((profile)=> {
      this.profile = profile;
    });

    this.deathTime = 0;
  
    this.recommended = [];
    this.recommended_posts$.forEach((posts) => {
      console.log(posts);
      this.recommended = posts;
    });
    this.recommended = this.recommended.sort((a, b) => (a.timeStamp < b.timeStamp ? 1 : -1));
    this.recommended = this.recommended.slice(0, 3);
    // console.log("Recommended posts");
    // console.log(this.recommended);

    this.trending = [];
    this.trending_posts$.forEach((posts) => {
      // console.log("Trending posts");
      // console.log(posts);
      this.trending = posts;
    })
    this.trending.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1));
  }

  //Load Current Profiles Time when you enter page
  ionViewWillEnter(){
    this.deathTime = (this.profile) ? this.profile.timeOfExpiry : 1234567;
  }

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

  searchResults = [
    { title: "Touching grass for the first time", desc: "Deleted my reddit account to try out this new Twenty4 thing", content: "https://picsum.photos/id/18/300/300" },
    { title: "Wow look at this cool tree I found", desc: "fren.", content: "https://picsum.photos/id/19/300/300" },
    { title: "My desk setup! Much wow very neat :)", desc: "Just kidding, this is a stock photo I stole. Please give me time immabouta die :'(", content: "https://picsum.photos/id/20/300/300" },
    { title: "Selling my shoes as an NFT", desc: "Originally I wanted to sell the actual shoes, but then I realized I like them too much so instead I'll just sell this picture of them which is a very nice picture if I do say so myself. $400", content: "https://picsum.photos/id/21/300/300" },
    { title: "A girl asked what my favorite position was", desc: "I told her, 'CEO'", content: "https://picsum.photos/id/22/300/300" },
    { title: "I ONLY KNOW HOW TO USE CHOPSTICKS", desc: "PLEASE HELP I NEED TO USE ONE OF THESE OR IM GONNA STARVE TO DEATH", content: "https://picsum.photos/id/23/300/300" },
    { title: "I'm a 20 year old virgin", desc: "I'm a 20 year old virgin", content: "https://picsum.photos/id/24/300/300" }, // Copilot generated this one lmao
  ]

  isSearchbarVisible = false;
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
    if (event.detail.scrollTop > 220 && !this.isKronosBarVisible) {
      this.renderer.setStyle(document.querySelector(".barKronos"), 'opacity', '1');
      this.isKronosBarVisible = true;
    }
    else if (event.detail.scrollTop <= 220) {
      this.renderer.setStyle(document.querySelector(".barKronos"), 'opacity', '0');
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
    const blipData = await this.api.GetBlipContent({user: data.user_id, post: data.post_id});
    
    //Representation for blipData
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
        dat: data,
        blipContent: blipData //TODO: Change `dat` back to `data` once properly integrated
      }
    });

    // modal.onDidDismiss().then((data) => {
    //   console.log(data);
    // });

    return await modal.present();
  }

  async openProfile(profileData: any) {
    const modal = await this.modalController.create({
      component: ProfileOtherComponent,
      componentProps: {
        profile: profileData
      }
    });

    return await modal.present();
  }
}

