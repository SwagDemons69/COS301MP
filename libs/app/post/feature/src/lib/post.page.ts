/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NavController } from '@ionic/angular/providers/nav-controller';
import { PostApi } from '@mp/app/post/data-access';

@Component({
  selector: 'post-page',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.css']
})
export class PostPage {
  postForm : FormGroup
  private file : File = {} as File;
  //Dont think validators needed
  constructor(private formBuilder: FormBuilder,
              private readonly api : PostApi)
  {
    this.postForm = this.formBuilder.group({
      file: ['', Validators.required],
      caption: ['', Validators.required]
    })
  }
  //get reference to file uploaded
  onFileChange(event : any){
    this.file = event.target.files[0];
  }

  async uploadPost(){
    //alert("Post created")
    //alert(JSON.stringify(this.postForm.value, null, 2));
    //console.log()

    // const formData = new FormData();
    // formData.append("photo", this.file, this.file.name);
    this.api.uploadPost(this.file, this.file.name);
    
  }
}