import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, filter } from 'rxjs';
import { ToastrService } from '../toastr.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService:ToastrService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter(httpEvent=>httpEvent instanceof HttpResponse),
      catchError<any,any>(httpEvent=>{
        this.errorHandler(httpEvent)
      }),
    )
  }

  private errorHandler(event: any): any {
    // const body = event
    // let str = '';
    // if(body?.errors){
    //   for (const propertyName in body.errors) {
    //     const localizeKey = propertyName.substring( 0, 1 ).toLowerCase() + propertyName.substring( 1, propertyName.length )
    //     str += localize( localizeKey ) + ':<br/>'
    //     body.errors[ propertyName ].forEach(err=>{
    //       str += errorStringFormat( err, [propertyName], [localizeKey] ) + '<br/>'
    //     })
    //   }
    //   this.toastrService.error( 'خطأ', '', { html:str } )
    // }
  }

}
