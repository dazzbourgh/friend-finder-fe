import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../domain/group';

const URL_GROUP = `${environment.baseUrl}/group`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getGroupInfo(id: string): Observable<Group> {
    return this.http.get<Group>(`${URL_GROUP}/${id}`);
  }
}
