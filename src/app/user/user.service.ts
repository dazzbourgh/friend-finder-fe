import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../domain/user';
import { BackendRequest } from '../domain/backend-request';

const URL = `${environment.baseUrl}/people`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(request: BackendRequest): Observable<User[]> {
    const asyncOptions = {
      observe: 'events' as 'body',
      responseType: 'text' as 'json',
      reportProgress: true,
      withCredentials: true
    };
    return this.http.post<any>(URL, request, asyncOptions)
      .pipe(
        filter(e => e.type === 3 && e.partialText),
        map(e => {
          return e.partialText.trim()
            .split('\n')
            .map(userDtoJson => JSON.parse(userDtoJson) as User);
        })
      );
  }
}
