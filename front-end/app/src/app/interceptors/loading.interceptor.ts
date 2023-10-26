import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { CommonService } from '../pages/service/common.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private service : CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service.showLoader()
    return next.handle(request).pipe(finalize(()=>{
      this.service.hideLoader()
    }));
  }
}
