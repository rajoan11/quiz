import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from '../../contrainte/config/admin/admin-routing.module';
import { SharedModule } from '../../contrainte/config/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [AdminComponent]
})
export class AdminPresentationModule { }
