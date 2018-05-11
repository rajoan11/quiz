import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontRootComponent } from './front-root/front-root.component';
import { FrontRoutingModule } from '../../contrainte/config/front/front-routing.module';

@NgModule({
  imports: [CommonModule, FrontRoutingModule],
  declarations: [FrontRootComponent]
})
export class FrontPresentationModule {}
