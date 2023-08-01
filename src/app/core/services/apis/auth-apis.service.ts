import { Injectable } from '@angular/core';
import  * as Users   from 'src/assets/data/users.json';
import { User } from '../../models/users';
import { LoginRequest } from '../../models/login-request';

@Injectable()
export class AuthApisService {
  users :User[] = Array.from(Users) // as User is of esModule type
  constructor() { }
  login(user:LoginRequest) : User | undefined {
    const userData = this.users.find(_user=>_user.name == user.name && _user.password == user.password)
    return userData
  }
}


