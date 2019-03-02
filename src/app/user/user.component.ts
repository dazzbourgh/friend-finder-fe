import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../dto/user-dto";
import {UserService} from "./user.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDtos: UserDto[];
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
    this.userDtos = [];
    this.userService.fetchUsers(this.communities,
      {
        sex: this.gender
      }).subscribe(users => {
      this.userDtos = users.filter(user => user.data);
      console.log(JSON.stringify(this.userDtos));
    });
  }

  sanitize(url: string): SafeUrl {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustUrl(url.replace('"', ''));
  }
}
