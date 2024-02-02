import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrls } from '../constants/apiUrls';
import { Observable } from 'rxjs';
import { UserListApi } from '../interfaces/inteface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = '';
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
   }

   getUsersList(): Observable<UserListApi> {
    return this.http.get<UserListApi>(`${this.baseUrl}${ApiUrls.GetUsers}`)
   }
}
