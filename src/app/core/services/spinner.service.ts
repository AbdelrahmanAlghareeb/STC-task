import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  private spinnerState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  spinnerState$:Observable<boolean> = this.spinnerState.asObservable()
  constructor() { }
  showSpinner() :void {
    this.spinnerState.next(true)
  }
  hideSpinner() :void{
    this.spinnerState.next(false)
  }
}
