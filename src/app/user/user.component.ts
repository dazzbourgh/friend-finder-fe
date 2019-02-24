import {Component, Input, OnInit} from '@angular/core';
import {User} from "../domain/user";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: Observable<User[]>;
  @Input()
  communities: string = '';
  @Input()
  gender: number = 1;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  fetchUsers() {
    this.users = this.userService.fetchUsers(this.communities,
      {
        sex: this.gender
      });
  }

  sanitize(url: string): SafeUrl {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustUrl(url.replace('"', ''));
  }
}
