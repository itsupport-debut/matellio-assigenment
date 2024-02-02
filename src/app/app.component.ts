import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'matellio-assignment';

  constructor(
    private swPush: SwPush
  ) {}

  ngOnInit(): void {
   
    this.subscribeToNotifications()
  }

  ngAfterViewInit(): void {
    this.testNotification()
  }

  async subscribeToNotifications() {
    try {
      
      const subscription = await this.swPush.requestSubscription({
        serverPublicKey: '<YOUR_PUBLIC_VAPID_KEY>'
      });
      console.log('Push subscription obtained:', subscription);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  }


  testNotification(): void {
    const notificationOptions: NotificationOptions = {
      body: 'Trying to get push notification',
      icon: '', 
    };
    this.showNotification('Matellio Assignment', notificationOptions);
  }
  async showNotification(title: string, options: NotificationOptions) {
    const permission = await Notification.requestPermission();
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
}
