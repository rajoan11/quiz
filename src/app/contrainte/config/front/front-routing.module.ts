import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrontRootComponent } from '../../../presentation/front/front-root/front-root.component';

const routes: Routes = [
  {
    path: 'front',
    component: FrontRootComponent
    // children: [
    //   { path: '', redirectTo: 'stat', pathMatch: 'full' },
    //   {
    //     path: 'stat',
    //     component: QuizStatComponent
    //   },
    //   {
    //     path: 'preview',
    //     component: QuizApercuComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule {}
