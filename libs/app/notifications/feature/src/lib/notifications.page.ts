import { Component, OnInit } from '@angular/core';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { notification } from '@mp/api/notifications/util';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.css']
})
export class NotificationsPage implements OnInit {
  notifications : notification[] = [];

  constructor(private notificationRepository: NotificationRepository) {}

  ngOnInit(): void {
    this.getNotifications('user_id_here');
  }

  async getNotifications(userId : string) {
    const response = await this.notificationRepository.getNotifications(userId);
    this.notifications = response.notifications;
  }
<<<<<<< HEAD

  refreshPage() {
    window.location.reload();
  }
  
}

// {
//     user_id: '1234',
//     type: NotificationType.FollowNotification,
//     seen: false,
//     timestamp: Timestamp,
//     notification_id: '1234',
//     follower_id: '1234',
// }
=======
}
>>>>>>> 077f8e7 (Added Notification repository logic)
