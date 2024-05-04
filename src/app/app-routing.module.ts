import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteComponent } from './components/write/write.component';
const routes: Routes = [
  { path: 'write', component: WriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
