import { Component, OnInit } from '@angular/core';
import { GroupService } from './core/group/group.service';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'SplitExpense';
  pagination!: Pagination;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroupsByUserId()
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
