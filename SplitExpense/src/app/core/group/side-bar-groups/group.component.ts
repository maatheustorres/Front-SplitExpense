import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  pagination!: Pagination;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroupsByUserId();
  }

  getGroupsByUserId() {
    const page = 1;
    const pageSize = 10;
    this.groupService.getGroupsByUserId('E0F62196-2876-41EE-81E6-A17AEEC13A55', page, pageSize).subscribe(response => {
      this.pagination = response;
      console.log(this.pagination);
    }, error => {
      console.log(error);
    })
  }
}