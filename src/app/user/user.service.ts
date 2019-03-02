import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dto/user-dto";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {environment} from "../../environments/environment";

const URL = `${environment.baseUrl}/people`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(communities: string, peopleFilters: any): Observable<UserDto[]> {
    const body = {
      communities: communities.split(","),
      peopleFilters: peopleFilters
    };
    const asyncOptions = {
      observe: 'events' as 'body',
      responseType: 'text' as 'json',
      reportProgress: true
    };
    return this.http.post<any>(URL, body, asyncOptions)
      .pipe(
        filter(e => e.type === 3 && e.partialText),
        map(e => {
          return e.partialText.trim()
            .split('\n')
            .map(userDtoJson => JSON.parse(userDtoJson) as UserDto);
        })
      )
  }
}
