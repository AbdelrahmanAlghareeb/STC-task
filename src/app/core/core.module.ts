import { APP_INITIALIZER, LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { SpinnerService } from './services/spinner.service';
import { LoaderComponent } from '../standalone/loader/loader.component';
import { ToastrService } from './services/toastr.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthApisService } from './services/apis/auth-apis.service';
import { ProductsApisService } from './services/apis/products-apis.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './services/interceptors/loading.interceptor';
import { ErrorHandlerInterceptor } from './services/interceptors/error-handler.interceptor';
import { HeadersInterceptor } from './services/interceptors/headers.interceptor';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderComponent,
    MatSnackBarModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
  ],
  exports:[
    MatProgressSpinnerModule,
    LoaderComponent
  ],
  providers:[
    AuthService,
    SpinnerService,
    ToastrService,
    AuthApisService,
    ProductsApisService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core:CoreModule ){
    if (core) {
        throw new Error("You should import core module only in the root module")
    }
  }
}
