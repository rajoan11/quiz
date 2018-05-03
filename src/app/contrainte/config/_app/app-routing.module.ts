import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routes = [{ path: '', redirectTo: 'admin', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
