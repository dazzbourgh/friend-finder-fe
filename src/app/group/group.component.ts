import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Group } from '../domain/group';
import { GroupService } from './group.service';

@Component({
  selector: 'ci-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Output() added = new EventEmitter<Group[]>();
  @Input('groupId') groupId: string;
  groups: Group[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  addGroup() {
    this.groupService.getGroupInfo(this.groupId)
      .subscribe((group: Group) => {
        this.groups.push(group);
        this.added.emit(this.groups);
      })
  }
  
  removeGroup(group: Group) {
    this.groups.splice(this.groups.indexOf(group), 1);
  }
}
