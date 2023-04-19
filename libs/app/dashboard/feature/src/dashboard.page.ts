import { Component, Renderer2 } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { user_profile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;

  constructor (
    private renderer: Renderer2,
    private modalController: ModalController,
  ) {}

  // A bunch of dummy recommended posts
  recommended = [
    { title: "Touching grass for the first time", desc: "Deleted my reddit account to try out this new Twenty4 thing", img: "https://picsum.photos/id/18/300/300" },
    { title: "Wow look at this cool tree I found", desc: "fren.", img: "https://picsum.photos/id/19/300/300" },
    { title: "My desk setup! Much wow very neat :)", desc: "Just kidding, this is a stock photo I stole. Please give me time immabouta die :'(", img: "https://picsum.photos/id/20/300/300" },
    { title: "Selling my shoes as an NFT", desc: "Originally I wanted to sell the actual shoes, but then I realized I like them too much so instead I'll just sell this picture of them which is a very nice picture if I do say so myself. $400", img: "https://picsum.photos/id/21/300/300" },
    { title: "A girl asked what my favorite position was", desc: "I told her, 'CEO'", img: "https://picsum.photos/id/22/300/300" },
    { title: "I ONLY KNOW HOW TO USE CHOPSTICKS", desc: "PLEASE HELP I NEED TO USE ONE OF THESE OR IM GONNA STARVE TO DEATH", img: "https://picsum.photos/id/23/300/300" }
  ]

  // A bunch of dummy trending posts
  trending = [
    { caption: "Touching grass for the first time", desc: "Deleted my reddit account to try out this new Twenty4 thing", content: "https://picsum.photos/id/18/300/300" },
    { caption: "Wow look at this cool tree I found", desc: "fren.", content: "https://picsum.photos/id/19/300/300" },
    { caption: "My desk setup! Much wow very neat :)", desc: "Just kidding, this is a stock photo I stole. Please give me time immabouta die :'(", content: "https://picsum.photos/id/20/300/300" },
    { caption: "Selling my shoes as an NFT", desc: "Originally I wanted to sell the actual shoes, but then I realized I like them too much so instead I'll just sell this picture of them which is a very nice picture if I do say so myself. $400", content: "https://picsum.photos/id/21/300/300" },
    { caption: "A girl asked what my favorite position was", desc: "I told her, 'CEO'", content: "https://picsum.photos/id/22/300/300" },
    { caption: "I ONLY KNOW HOW TO USE CHOPSTICKS", desc: "PLEASE HELP I NEED TO USE ONE OF THESE OR IM GONNA STARVE TO DEATH", content: "https://picsum.photos/id/23/300/300" },
    { caption: "I'm a 20 year old virgin", desc: "I'm a 20 year old virgin", content: "https://picsum.photos/id/24/300/300" }, // Copilot generated this one lmao
  ]

  searchResults = [
    { title: "Touching grass for the first time", desc: "Deleted my reddit account to try out this new Twenty4 thing", img: "https://picsum.photos/id/18/300/300" },
    { title: "Wow look at this cool tree I found", desc: "fren.", img: "https://picsum.photos/id/19/300/300" },
    { title: "My desk setup! Much wow very neat :)", desc: "Just kidding, this is a stock photo I stole. Please give me time immabouta die :'(", img: "https://picsum.photos/id/20/300/300" },
    { title: "Selling my shoes as an NFT", desc: "Originally I wanted to sell the actual shoes, but then I realized I like them too much so instead I'll just sell this picture of them which is a very nice picture if I do say so myself. $400", img: "https://picsum.photos/id/21/300/300" },
    { title: "A girl asked what my favorite position was", desc: "I told her, 'CEO'", img: "https://picsum.photos/id/22/300/300" },
    { title: "I ONLY KNOW HOW TO USE CHOPSTICKS", desc: "PLEASE HELP I NEED TO USE ONE OF THESE OR IM GONNA STARVE TO DEATH", img: "https://picsum.photos/id/23/300/300" },
    { title: "I'm a 20 year old virgin", desc: "I'm a 20 year old virgin", img: "https://picsum.photos/id/24/300/300" }, // Copilot generated this one lmao
  ]

  isSearchbarVisible = false;
  // deathTime = 3132079200
  deathTime = Date.now() / 1000 + 10;
  kronos = ""

  kronosTimer = setInterval(() => {
    const counter = this.deathTime - Date.now() / 1000;
    this.kronos = this.displayKronos(counter);
  }, 999)

  pickRandom(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Convert a unix timestamp to a kronos string
  displayKronos(timeDelta : number) {
    if (timeDelta < 0)
    {
      return ([
        this.pickRandom([ "ELIMINATED", "TERMINATED", ]),
        this.pickRandom([ "DISBANDED", "DISMISSED", ]),
        this.pickRandom([ "DECEASED", "DEPLETED", "PERISHED", ]),
        this.pickRandom([ "EXPIRED", "EXTINCT", ]),
        this.pickRandom([ "CEASED", "WASTED", ]),
        this.pickRandom([ "INERT", "ENDED" ]),
        this.pickRandom([ "DEAD", "LATE", ]),
      ])[Math.floor(Math.abs(timeDelta))%7] + "💀";
    }

    const [years, days, hours, minutes, seconds] = [
      Math.floor( timeDelta / (60*60*24*365)),
      Math.floor((timeDelta % (60*60*24*365)) / 86400),
      Math.floor((timeDelta % (60*60*24)) / 3600),
      Math.floor((timeDelta % (60*60)) / 60),
      Math.floor( timeDelta % (60)),
    ];
    const [syears, sdays, shours, sminutes, sseconds] = [
      years.toString(),
      days.toString().padStart(3, '0'),
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ]

    // HH:MM:SS
    if (years < 1 && days < 1) {
      return `${shours}:${sminutes}:${sseconds}`
    }
    // DD:HH:MM:SS
    else if (years < 1) {
      return `${sdays}:${shours}:${sminutes}:${sseconds}`
    }
    // YY:DD:HH:MM:SS
    else {
      return `${syears}:${sdays}:${shours}:${sminutes}:${sseconds}`
    }
  }

  toggleSearchbar() {
    this.isSearchbarVisible = !this.isSearchbarVisible;
  }

  onContentScroll(event: any) {
    console.log(event.detail.scrollTop);
    if (event.detail.scrollTop > 220) {
      this.renderer.setStyle(document.querySelector(".barKronos"), 'opacity', '1');
    }
    else {
      this.renderer.setStyle(document.querySelector(".barKronos"), 'opacity', '0');
    }
  }

  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      event.target.disabled = true;
    }, 2000);
  }

  // See [https://stackblitz.com/edit/ionic6-angular13-wnmgmu?file=src/app/app.component.ts] for reference
  async openBlip(data: any) {
    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    });

    return await modal.present();
  }
}