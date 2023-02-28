import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { CreateGroupRequest } from 'src/app/models/request/create-group-request';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  groupForm: any = FormGroup;
  createGroupRequest = {} as CreateGroupRequest;
  userId = '';
  group = {} as Group;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private router: Router) { }

  ngOnInit(): void {
    this.createGroupForm();
    this.userId = localStorage.getItem('userId') as string;
  }

  createGroupForm() {
    this.groupForm = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required]
    })
  }

  onSubmit() {
    this.createGroupRequest.userId = this.userId;
    this.createGroupRequest.categoryId = parseInt(this.groupForm.value.category);
    this.createGroupRequest.name = this.groupForm.value.name;
    return this.groupService.createGroup(this.createGroupRequest).subscribe(response => {
      this.group = response;
      console.log(this.group.id);
      this.router.navigate([`group/add-users/${this.group.id}`])
    }, error => {
      console.log(error);
    })
  }
}
