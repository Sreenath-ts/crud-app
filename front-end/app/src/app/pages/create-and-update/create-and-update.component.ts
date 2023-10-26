import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { Subscription, filter, forkJoin, map, switchMap, take } from 'rxjs';
import { record } from '../models/model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-and-update',
  templateUrl: './create-and-update.component.html',
  styleUrls: ['./create-and-update.component.css']
})
export class CreateAndUpdateComponent implements OnInit,OnDestroy{
  constructor(private service:CommonService,private activeRoute : ActivatedRoute){}
  store!:Subscription
  update = false;
  storeData!:record[]
  form = new FormGroup({
    id : new FormControl({value:'',disabled:true}),
    name : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    phone : new FormControl('',[Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^\d+$/)]),
    city : new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
     this.store = this.service.store.pipe(
        filter(data => data !== null),
        take(1),
    switchMap((storeData) => {
      return this.activeRoute.queryParamMap.pipe(
        map((queryParamMap: ParamMap) => ({ storeData, queryParamMap }))
      );
    })
  )
  .subscribe(({ storeData, queryParamMap }) => {
    if(storeData) this.storeData = storeData
    let id = ''
       if (Array.isArray(storeData)) {
       id = storeData?.length + 1 + '';
      }
       if(queryParamMap.get('id') !==null){
        this.update = true;
        id = queryParamMap.get('id')!;
       }
       this.form.controls.id.patchValue(id);
       if(this.update){
         let updateRec = storeData?.find(record => record.id == id);
         if(updateRec){
          this.form.controls.name.patchValue(updateRec.name)
          this.form.controls.email.patchValue(updateRec.email)
          this.form.controls.phone.patchValue(updateRec.phone)
          this.form.controls.city.patchValue(updateRec.city)
         }
       }
  });
    
    
  }
  submit(){
    let id = {id : this.form.controls.id.value}
    let value = JSON.parse(JSON.stringify(this.form.value));
    
    value = {...id,...value}
    if(this.update){
       this.service.updateData(value).subscribe(res => {
        
        
        this.updateStore(id.id ?? '' ,value)
      }
       )
    }else {
      this.service.createData(value).subscribe(res => {
        this.updateStore(id.id ?? '' ,value)
      }
      )
    }
  }
  ngOnDestroy(): void {
    if(this.store) this.store.unsubscribe()
  }
  updateStore(id:string,data:record){
  
    this.form.reset()
    if(Number(id) > this.storeData.length){
      this.storeData.push(data)
      
    }else{
      this.storeData.forEach((el,index) => {
        if(el.id == id){
          this.storeData[index] = data;
        }
      })
    }
    this.service.store.next(this.storeData)
  }
}
