import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostPage } from './post.page';
import { PostRouting } from './post.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PostModule as PostAuthModule } from '@mp/app/post/data-access';

@NgModule({
  imports: [CommonModule, 
            IonicModule, 
            PostRouting, 
            FormsModule, 
            ReactiveFormsModule,
            PostAuthModule,
            NgxSkeletonLoaderModule],
  exports: [PostPage],
  declarations: [PostPage],
})
export class PostModule {}