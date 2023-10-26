import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { NotificationService } from '../notification.service';
import { apiResponse } from '../pages/models/model';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private service:NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event:HttpEvent<any>)=> {
      if(event instanceof HttpResponse){
           const body:apiResponse = event.body
           if(body.status == 'ok'){
            this.service.showSuccess(body.message,'congratutlations')
           }else{
              this.service.showError(body.message,'oops')
           }
      }
    }),
    catchError((err:HttpErrorResponse)=> {
      const urlRegex = /(https?:\/\/[^\s]+)/g // api url replace regex 
      this.service.showError(err.message.replace(urlRegex,'"Server connection"'+' | ' +err.statusText),'oops')
       return throwError(err)
    }));
  }
}

