import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiResponse, record} from '../models/model'
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
    baseUrl = 'http://localhost:3000';
    store = new BehaviorSubject<null | record[]>(null);
  constructor(private http: HttpClient) { }

  getData(){
     return this.http.get<apiResponse>(`${this.baseUrl}/api/data`)
     .pipe(tap((data:apiResponse)=> this.store.next(data.data)))
  }

  createData(data:record){
    return this.http.post(`${this.baseUrl}/api/upload-data`,data)
  }
 
  updateData(data:record){
    return this.http.put(`${this.baseUrl}/api/data/${data.id}`,data)
  }
  
  deleteData(id:string){
    return this.http.delete(`${this.baseUrl}/api/data/${id}`)
  }

  
  public loadingSubject = new BehaviorSubject(false)


  

  showLoader(){
    this.loadingSubject.next(true)
  }

  hideLoader(){
    this.loadingSubject.next(false)
  }
}
