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
  constructor() { }

  ngOnInit(): void {
  }

}
