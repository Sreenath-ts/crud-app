import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Observable, Subscription, map, tap } from 'rxjs';
import { apiResponse, record } from '../models/model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {
  constructor(private service:CommonService){}
  sub!:Subscription
  data!:Observable<record[] | null> 
  ngOnInit(): void {
    this.data = this.service.store.asObservable()
  }
  deleteRecord(id:string){
    this.service.deleteData(id).subscribe((res) => {
     this.sub = this.service.getData().subscribe()
    })
  }
  ngOnDestroy(): void {
   if(this.sub) this.sub.unsubscribe()
  }
}
