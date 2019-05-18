import { Component, Input, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from './user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BackendRequest } from '../domain/backend-request';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  @Input()
  groupIds: string = '';
  @Input()
  gender: number = 1;
  @Input()
  city: string = '';
  @Input()
  ageFrom: number;
  @Input()
  ageTo: number;

  private activeRequest: Subscription;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  fetchUsers() {
    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
    }
    this.activeRequest = this.userService.fetchUsers(
      new BackendRequest(
        this.groupIds.split(','),
        {
          sex: this.gender.toString(),
          city: this.getCity(this.city),
          ageFrom: this.ageFrom.toString(),
          ageTo: this.ageTo.toString()
        }))
      .subscribe(users => this.users = users);
  }

  sanitize(url: string): SafeUrl {
    if (!url) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustUrl(url.replace('"', ''));
  }

  private getCity(city: string): string {
    //TODO: hardcoded to StP, need to add new UI for cities after
    // authorization is added
    return '2';
  }
}
