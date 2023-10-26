import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from './pages/service/common.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  constructor(private servive:CommonService){}
  view = false;
  sub!:Subscription
  loadSub!:Subscription
  
  ngOnInit(): void {
    this.sub = this.servive.getData().subscribe()
    this.loadSub = this.servive.loadingSubject.subscribe(res =>{
      this.view = res
    })
  }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
  title = 'app';
}
