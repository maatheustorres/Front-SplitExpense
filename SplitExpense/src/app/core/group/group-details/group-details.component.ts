import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/response/group';
import { Pagination } from 'src/app/models/response/pagination';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  groups: Pagination = {
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
  };
  displayedColumns: string[] = ['name', 'category', 'fullname', 'createdOnUtc', 'actions']
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroupsByUserId();
  }

  getGroupsByUserId() {
    const page = 1;
    const pageSize = 10;
    const userId = localStorage.getItem('userId') as string;
    return this.groupService.getGroupsByUserId(userId, page, pageSize).subscribe(response => {
      this.groups.items = response.items;
      this.dataSource = new MatTableDataSource<Group>(this.groups.items);
      if(this.matPaginator){
        this.dataSource.paginator = this.matPaginator;
      }

      if(this.matSort) {
        this.dataSource.sort = this.matSort;
      }
    }, error => {
      console.log(error)
    })
  }
}
