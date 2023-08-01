import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from 'src/app/core/models/login-request';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { AuthApisService } from 'src/app/core/services/apis/auth-apis.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginReq:LoginRequest = new LoginRequest()
  hidePassword:boolean = true
  constructor(
    private authApiService: AuthApisService,
    private toastrService: ToastrService,
    private authService:AuthService,
    private router:Router
    ) {
  }
  login(){
    let user = this.authApiService.login(this.loginReq)
    if(!user) return this.toastrService.error('Invalid Username or Password')
    this.authService.userData = user
    this.toastrService.success('Logged In successfully')
    this.router.navigate([this.authService.findPerfectPath()])
  }

  onSubmit(form:NgForm){
    if(form.invalid) {
      this.toastrService.error('Please complete all the required fields')
      return form.form.markAllAsTouched()
    }
    this.login()
  }
}
