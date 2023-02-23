import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Pagination } from 'src/app/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.baseUrl;
  httpOptions: Object = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ODc4YmM3Mi00ZjMzLTQyMjItOTZhMC00ZjkyODU1NGMzMTIiLCJlbWFpbCI6Im1tdG9ycmVzZG9zcmVpc0BnbWFpbC5jb20iLCJuYW1lIjoiTWF0aGV1cyBUb3JyZXMiLCJleHAiOjE2NzcxNjExMzAsImlzcyI6IlNwbGl0RXhwZW5zZSIsImF1ZCI6IlNwbGl0RXhwZW5zZSJ9.twl7JGVDgT1EpTtRUu_tjzePnw33aoGgsWVtLlImMbc'
    }),
    responseType: 'json'
  }

  constructor(private http: HttpClient) { }

  getGroupsByUserId(id: string, page: number, pageSize: number) {
    return this.http.get<Pagination>(`${this.baseUrl}/Group/userId/${id}?page=${page}&pageSize=${pageSize}`, this.httpOptions);
  }
}
