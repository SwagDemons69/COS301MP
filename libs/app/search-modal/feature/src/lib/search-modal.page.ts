/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'search-modal-page',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss']
})
export class searchmodalPage {
    
    constructor(private modalController: ModalController) { }

    users: any[] = [
        {
            name: 'John Smith',
            email: 'john@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
    ];

      

    ngOnInit() {}
  
    closeModal() {
      this.modalController.dismiss();
    }

    dismiss() {
    this.modalController.dismiss({
        dismissed: true
    });
    }


}