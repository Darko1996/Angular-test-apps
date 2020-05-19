import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: './lazy.module#LazyModule'},
  {path: 'home', component: HomeComponent},
  {path: 'add', loadChildren: './lazy-add.module#LazyAddModule',  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
