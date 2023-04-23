/* eslint-disable @typescript-eslint/no-empty-function */
// import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';
import { Component } from '@angular/core';


@Component({
  selector: 'post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage{

  constructor() {
  }

  caption = ""
  tags = [
    "", "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"
  ]

  updateTagList() {
    const tagList = document.getElementById("tagList");
    if(tagList == null) return;

    // Remove previous tags
    while(tagList.lastChild) {
      document.removeChild(tagList.lastChild);
    }

    this.tags.forEach(x => x.toLowerCase().trim());
    this.tags.sort();

    let prevTag = "";
    for(let t = 0; t < this.tags.length; t++) {
      const tag = this.tags[t];

      // Skip duplicates and empty strings
      if(tag == prevTag) {
        continue;
      }

      const el = document.createElement("ion-badge");
      el.innerText = "#" + tag;

      tagList?.appendChild(el);

      prevTag = tag;
    }
  }

  onCaptionChanged() {
  }
}