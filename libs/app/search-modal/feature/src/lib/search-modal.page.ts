/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'search-modal-page',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss']
})
export class searchmodalPage {
    
    constructor(private navCtrl: NavController, private modalController: ModalController) {
        this.initializeUsers();
      }
      users: any[] = [];
    
      initializeUsers() {
        this.users = [
          {
            "id": 1,
            "name": "Mia Graham",
            "username": "Bret",
            "isFriend": false,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-95-116461.png?f=avif&w=256" 
          },
          {
            "id": 2,
            "name": "Ethan Howell",
            "username": "Antonette",
            "isFriend": true,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-95-116461.png?f=avif&w=256"
          },
          {     
            "id": 3,
            "name": "Joy Bauch",
            "username": "Samantha",
            "isFriend": false,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-95-116461.png?f=avif&w=256"
          },
          {
            "id": 4,
            "name": "Patricia Lebsack",
            "username": "Charlotte",
            "isFriend": true,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-133-116499.png?f=avif&w=256"
          },
          {
            "id": 5,
            "name": "Avery Dietrich",
            "username": "Kamren",
            "isFriend": false,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-133-116499.png?f=avif&w=256"
          },
          {
            "id": 6,
            "name": "Bari Schulist",
            "username": "Jackson",
            "isFriend": true,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-133-116499.png?f=avif&w=256"
          },
          {
            "id": 7,
            "name": "Emma Weissnat",
            "username": "Emma",
            "isFriend": true,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-136-116502.png?f=avif&w=256"
          },
          {
            "id": 8,
            "name": "Isabella Runolfsdottir V",
            "username": "Isabella",
            "isFriend": false,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-136-116502.png?f=avif&w=256"
          },
          {
            "id": 9,
            "name": "Olivia Huels",
            "username": "Olivia",
            "isFriend": true,
            "avatar": "https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-136-116502.png?f=avif&w=256"
          }  
        ];}
    
        getUsers(event: Event) {
          // Reset users back to all of the users
          this.initializeUsers();
          // const value = (event as CustomEvent).detail.value;
        
          // set val to the value of the ev target
          const value = (event.target as HTMLInputElement).value;
        
          // if the value is an empty string don't filter the users
          if (value && value.trim() !== '') {
            this.users = this.users.filter((user) => {
              return (user.username.toLowerCase().indexOf(value.toLowerCase()) > -1);
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