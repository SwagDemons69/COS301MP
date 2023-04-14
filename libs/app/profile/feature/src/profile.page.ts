import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user_profile } from '@mp/api/profiles/util';
import { AlertController, ModalController } from '@ionic/angular';
import { BlipComponent } from '@mp/app//shared-components';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { post } from '@mp/api/home/util';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(ProfileState.posts) posts$!: Observable<post | null>;
  userForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  )
  {
    this.userForm = this.formBuilder.group({
      notPublic: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      profilePicturePath: [''],
      bio: ['', Validators.required],
      province: ['', Validators.required]
    });
  }

  isEditingProfile = false;

  // data at the moment expects a json object as follows:
  // {title: "...", desc: "...", img: "..."}
  // TODO: Change this to properly reflect a post object
  // See: blip.component.html
  async openBlip(data: any, name: any) {
    const modal = await this.modalController.create({
      component: BlipComponent,
      componentProps: {
        data: data,
        user : name
      }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    });

    return await modal.present();
  }

  updateProfile() {
    alert(JSON.stringify(this.userForm.value, null, 2));
    this.isEditingProfile = false;
  }

}
