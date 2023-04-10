import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostPage } from './post.page';
import { PostRouting } from './post.routing';


@NgModule({
  imports: [CommonModule, IonicModule, PostRouting],
  exports: [PostPage],
  declarations: [PostPage],
})
export class PostModule {}
