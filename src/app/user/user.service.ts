import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../domain/user';
import { BackendRequest } from '../domain/backend-request';

const URL_PEOPLE = `${environment.baseUrl}/people`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(request: BackendRequest): Observable<User[]> {
    return this.http.post<User[]>(URL_PEOPLE, request);
  }

  getUserInfo() {
    return this.http.get(URL_PEOPLE + '/me')
  }
}
