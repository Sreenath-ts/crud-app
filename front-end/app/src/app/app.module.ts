import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAndUpdateComponent } from './pages/create-and-update/create-and-update.component';
import { FormErrorComponent } from './pages/form-error/form-error.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NotificationInterceptor } from './interceptors/notification.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateAndUpdateComponent,
    FormErrorComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass:LoadingInterceptor,
    multi:true
  },{
    provide:HTTP_INTERCEPTORS,
    useClass:NotificationInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
