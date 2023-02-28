import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUsersRequest } from 'src/app/models/request/add-users-request';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  addUsersForm: any = FormGroup;
  groupId = '';
  addUsersRequest: AddUsersRequest = {
    groupId: '',
    emails: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService) { }

  ngOnInit(): void {
    this.createAddUsersForm();
  }

  // TODO: Adicionar no backend automatico o usuario que criou o grupo

  createAddUsersForm() {
    this.addUsersForm = this.formBuilder.group({
      emails: this.formBuilder.array([this.createInput()])
    });
  }

  createInput() {
    return this.formBuilder.group({
      emails: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]]
    });
  }

  addNextInput() {
    (this.addUsersForm.controls['emails'] as FormArray).push(this.createInput())
  }

  removeInput(position: number) {
    (this.addUsersForm.controls['emails'] as FormArray).removeAt(position)
  }

  onSubmit() {
    this.route.paramMap.subscribe(response => {
      this.groupId = response.get('id') as string;
    })

    this.addUsersRequest.groupId = this.groupId
    this.addUsersRequest.emails = this.addUsersForm.value.emails.map((fields: { emails: any; }) => fields.emails);

    return this.groupService.addUsers(this.addUsersRequest).subscribe(response => {
      this.router.navigate(['home'])
    }, error => {
      console.log(error);
    })
  }
}
