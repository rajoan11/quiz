import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrontRootComponent } from '../../../presentation/front/front-root/front-root.component';
import { QuizzResponseComponent } from '../../../presentation/front/quizz-response/quizz-response.component';

const routes: Routes = [
  {
    path: 'front',
    component: FrontRootComponent,
    children: [
      { path: '', redirectTo: 'resp', pathMatch: 'full' },
      {
        path: 'resp',
        component: QuizzResponseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule {}
