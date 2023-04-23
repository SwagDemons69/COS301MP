/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SearchModalApi } from '@mp/app/search-modal/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { user_profile } from '@mp/api/profiles/util';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { SearchProfileModal } from '@mp/api/search-modal/util';


export interface Ordered{
  order_id : string;
  profile : SearchProfileModal;
}

@Component({
  selector: 'search-modal-page',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss']
})



  export class SearchModalPage {
      @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
      users: Ordered[] = [];
      user : user_profile | undefined
    
  constructor(private navCtrl: NavController, private modalController: ModalController, private readonly api: SearchModalApi) 
    {
      this.profile$.forEach((user) => {
        if(user){ this.user = user;
          this.initializeUsers(); }
      });
        
        
    }
    async initializeUsers() {
        if(typeof this.user != "undefined"){
            const response = await this.api.retrieveProfiles({ user: this.user.user_id});
            for(let i = 0; i < response.data.profiles.length; i++){
              this.users.push({order_id: i.toString(), profile: response.data.profiles[i]});
            }          
        } 
        else{
          alert("undefined")
        }
    }
        getUsers(event: Event) {
          // Reset users back to all of the users
          this.initializeUsers();
          // const value = (event as CustomEvent).detail.value;
        
          // set val to the value of the ev target
          const value = (event.target as HTMLInputElement).value;
        
          // if the value is an empty string don't filter the users
          if (value && value.trim() !== '') {
            this.users = this.users.filter((user) => {
              return (user.profile.username.toLowerCase().indexOf(value.toLowerCase()) > -1);
            })
          }
        }
    
        goToChats(Selecteduser: string) {
          console.log(Selecteduser);
          //move to the chat page and dismiss the modal using the dismiss method
          this.navCtrl.navigateForward('/home/chat');
         
          this.dismiss();
        }  

    ngOnInit() {}
  
    closeModal() {
      this.modalController.dismiss();
    }

    dismiss() {
    this.modalController.dismiss({
        dismissed: true
    });
    }


    onUserAddFriend(user: any) {
      // alert("Adding fren: " + JSON.stringify(user, null, 2));
      user.isFriend = !user.isFriend;
    }
}