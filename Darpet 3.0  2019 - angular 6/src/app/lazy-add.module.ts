import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path: '', component: AddComponent}
];

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  ]
})
export class LazyAddModule { }
