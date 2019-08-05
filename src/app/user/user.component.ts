import { Component, Input, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { Group } from '../domain/group';
import { UserService } from './user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BackendRequest } from '../domain/backend-request';
import { Account } from '../domain/account';

@Component({
  selector: 'ci-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  groups: Group[] = [];
  account: Account;

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
    this.userService.getUserInfo().subscribe((result : Account) => {
      this.account = result;
    })
  }

  onGroupAdded(groups: Group[]) {
    this.groups = groups;
  }

  fetchUsers() {
    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
    }
    this.activeRequest = this.userService.fetchUsers(
      new BackendRequest(
        this.groups.map(group => group.id.toString()),
        {
          sex: this.gender.toString(),
          city: this.getCity(this.city),
          ageFrom: this.ageFrom.toString(),
          ageTo: this.ageTo.toString()
        }))
      .subscribe((users: User[]) => this.users = users);
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
    if (city === 'Saint Petersburg') {
      return '2';
    } else {
      return '1';
    }
  }
}
