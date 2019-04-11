import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from '../dto/user-dto';
import { UserService } from './user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

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
  @Input()
  city: string = '';
  private activeRequest: Subscription;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer) {
  }

  private _progress: number = 0;

  get progress(): number {
    return this._progress;
  }

  set progress(value: number) {
    this._progress = (value == 100) ? 0 : value;
  }

  ngOnInit() {
  }

  fetchUsers() {
    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
    }
    this.userDtos = [];
    this.progress = 1;
    this.activeRequest = this.userService.fetchUsers(this.communities,
      {
        sex: this.gender,
        city: this.city
      }).subscribe(users => {
      if (this.userDtos.length > 0) {
        const newPercent = users[this.userDtos.length - 1].percent;
        this.progress = (newPercent > 0) ? newPercent : this.progress;
      }
      this.userDtos = users.filter(user => user.data);
    });
  }

  sanitize(url: string): SafeUrl {
    if (!url) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustUrl(url.replace('"', ''));
  }
}
