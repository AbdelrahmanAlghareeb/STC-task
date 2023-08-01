import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Inject, inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { UserDTO } from "../../models/user-dto";

// to protect login page from being opened by already logged in users
export const canActivateLogin: CanActivateChildFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  debugger
  const authService = inject(AuthService)
  const canActivate = !authService.isLoggedIn
  if(!canActivate) inject(Router).navigate([ authService.findPerfectPath() ])
  return canActivate
};

// for admins page
export const canActivateAdmin: CanActivateChildFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  debugger
  const authService = inject(AuthService)
  const canActivate = authService.isLoggedIn && authService.isAdmin
  if(!canActivate) inject(Router).navigate([authService.findPerfectPath()])
  return canActivate
};

// for users page
export const canActivateUser: CanActivateChildFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  debugger
  const authService = inject(AuthService)
  const canActivate = authService.isLoggedIn && !authService.isAdmin
  if(!canActivate) inject(Router).navigate([authService.findPerfectPath()])
  return canActivate
};

