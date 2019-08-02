import { Component, Input, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { Group } from '../domain/group';
import { UserService } from './user.service';
import { GroupService } from '../group/group.service';
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
  groups: Group[] = [];
  account: Account;

  @Input()
  groupId: string = '';
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
    private groupService: GroupService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((result: Account) => {
      this.account = result
    })
  }

  addGroup() {
    this.groupService.getGroupInfo(this.groupId).subscribe((result: Group) => {
      var index = this.groups.findIndex(group => group.id == result.id)
      if (index === -1) {
        this.groupId = ''
        this.groups.push(result)
      }
    })
  }

  removeGroup(group: Group) {
    this.groups.splice(this.groups.indexOf(group), 1);
  }

  fetchUsers() {
    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
    }
    this.activeRequest = this.userService.fetchUsers(
      new BackendRequest(
        this.groups.map(group => String(group.id)),
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
