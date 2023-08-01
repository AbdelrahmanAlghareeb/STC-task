import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  showSpinner!:boolean
  constructor(
    private spinnerService:SpinnerService
    ) {
  }
  ngOnInit(): void {
    this.triggerSpinner()
  }
  triggerSpinner(){
    this.spinnerService.spinnerState$.subscribe(state=>{
      this.showSpinner = state
    })
  }
}
