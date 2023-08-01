import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './standalone/login/login.component';
import { canActivateAdmin, canActivateLogin, canActivateUser } from './core/services/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadComponent : ()=> import('./standalone/login/login.component').then(mod=>mod.LoginComponent),
    title:"login",
    canActivate: [ canActivateLogin ],
  },
  {
    path:'dashboard',
    loadChildren : ()=> import('./modules/products-management/products-management.module').then(mod=>mod.ProductsManagementModule),
    title:"dashboard",
    canActivateChild: [ canActivateAdmin ],
  },
  {
    path:'products',
    loadChildren : ()=> import('./modules/products/products.module').then(mod=>mod.ProductsModule),
    title:"products",
    canActivateChild: [ canActivateUser ],
  },{
    path:'',
    pathMatch:'full',
    redirectTo:"/login"
  },
  {
    path:'not-found',
    loadComponent : ()=> import('./standalone/not-found/not-found.component').then(mod=>mod.NotFoundComponent),
    title:"not found"
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
