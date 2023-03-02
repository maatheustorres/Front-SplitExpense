import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Pagination } from 'src/app/models/pagination';
import { environment } from 'src/environments/environment';
import { CreateGroupRequest } from 'src/app/models/request/create-group-request';
import { Group } from 'src/app/models/group';
import { AddUsers } from 'src/app/models/add-users';
import { AddUsersRequest } from 'src/app/models/request/add-users-request';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createHttpOptions() {
    const token = localStorage.getItem('token');
    const httpOptions: Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }),
      responseType: 'json'
    }

    return httpOptions;
  }

  getGroupsByUserId(id: string, page: number, pageSize: number) {
    return this.http.get<Pagination>(`${this.baseUrl}/Group/userId/${id}?page=${page}&pageSize=${pageSize}`, this.createHttpOptions());
  }

  createGroup(groupValue: CreateGroupRequest) {
    return this.http.post<Group>(`${this.baseUrl}/group/create`, groupValue, this.createHttpOptions())
  }

  addUsers(addUsersValue: AddUsersRequest) {
    return this.http.post<AddUsers>(`${this.baseUrl}/group/add`, addUsersValue, this.createHttpOptions());
  }
}
