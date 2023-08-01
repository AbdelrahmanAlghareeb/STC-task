import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private spinner : SpinnerService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpSentEvent>> {
    this.spinner.showSpinner();

    this.totalRequests++;

    return next.handle(req)
    .pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) this.spinner.hideSpinner();
      }),
    )

  }
}
