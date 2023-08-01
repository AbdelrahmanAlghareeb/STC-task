import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers : HttpHeaders = new HttpHeaders({
      "content-type": "application/json-patch+json",
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    })
    return next.handle(headers ? req.clone({headers}) : req);
  }
}
