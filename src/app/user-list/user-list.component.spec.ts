import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UsersService } from '../services/users.service';
import { UserListApi } from '../interfaces/inteface';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UsersService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UsersService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers() on ngOnInit', () => {
    const spy = spyOn(component, 'getUsers');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get users list on ngOnInit', () => {
    const mockUserListApi: UserListApi = {
      limit: 10,
      skip: 10,
      total: 10, users: [{ id: 1, firstName: 'User 1', age: 1, bloodGroup : '', domain: '', email: '',eyeColor: '', gender: '', lastName: '', maidenName: '', phone: '' }],
    };

    spyOn(userService, 'getUsersList').and.returnValue(of(mockUserListApi));

    component.ngOnInit();

    expect(component.userList).toEqual(mockUserListApi.users);
  });


  it('should unsubscribe from userListSubscription on ngOnDestroy', () => {
    spyOn(component.userListSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.userListSubscription.unsubscribe).toHaveBeenCalled();
  });

});