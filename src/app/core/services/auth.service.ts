
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user-dto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private userDataSubject!:BehaviorSubject<UserDTO | null>
  private isLoggedInSubject!:BehaviorSubject<boolean>
  private _userData!:UserDTO | null
  private _isLoggedIn!:boolean
  userData$! : Observable<UserDTO | null>
  isLoggedIn$! : Observable<boolean>
  userDataLocalStorageKey:string = "userData";

  constructor(private router:Router) {
    this.readDataFromLocaleStorage()
    this.init()
  }

  get isLoggedIn () :boolean  { return this._isLoggedIn }
  set isLoggedIn (state:boolean) {
    this._isLoggedIn = state
    this.isLoggedInSubject.next(this._isLoggedIn)
  }
  get isAdmin () :boolean  { return Boolean(this._userData?.isAdmin) }
  get userData() : UserDTO | null {
    return this._userData
  }
  set userData(userData:UserDTO | null ){
    userData ? localStorage.setItem(this.userDataLocalStorageKey, JSON.stringify(userData)) : localStorage.removeItem(this.userDataLocalStorageKey);
    this._userData = userData
    this.userDataSubject.next(this._userData)
    this._isLoggedIn = Boolean(userData)
  }


  init(){
    this.userDataSubject =  new BehaviorSubject<UserDTO | null>(this._userData)
    this.isLoggedInSubject =  new BehaviorSubject<boolean>(this._isLoggedIn)
    this.userData$ = this.userDataSubject.asObservable()
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable()
  }
  readDataFromLocaleStorage(){
    const userData = localStorage.getItem(this.userDataLocalStorageKey)
    this._userData = userData ? JSON.parse(userData) : null
    this._isLoggedIn = Boolean(this._userData)
  }

  logout(){
    this.userData = null
    this.router.navigate(['/login'])
  }
  findPerfectPath() :string {
    return this.userData ? (this.userData.isAdmin ? '/dashboard' : 'products') : '/login'
  }

}


