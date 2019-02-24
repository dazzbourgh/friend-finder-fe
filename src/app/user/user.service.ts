import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../domain/user";
import {Observable} from "rxjs";

const URL = "http://localhost:8080/people";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(communities: string): Observable<User[]> {
    return this.http.post<User[]>(`${URL}`, {
      communities: communities.split(","),
      peopleFilters: {
        sex: 1
      }
    });
  }
}
