import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { UserList, UserListApi } from '../interfaces/inteface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userInput: string = ''
  userListSubscription: Subscription = new Subscription()
  userList: Array<UserList> = []
  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.userListSubscription = this._userService.getUsersList().subscribe(
      (success: UserListApi) => {
        this.userList = success.users;
        console.log(success);
        
      },
      error => {
        this.registerSync()
      }
    )
  }

  ngOnDestroy(): void {
    if(this.userListSubscription) this.userListSubscription.unsubscribe()
  }
  registerSync(): void {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      console.log(navigator);
      
      navigator.serviceWorker.ready
        .then((registration: any) => registration.sync.register('get-data'))
        .catch((err) => console.error('Background sync registration failed:', err));
    }
  }
}
