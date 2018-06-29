import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from '../../contrainte/config/authentication/authentication-routing.module';
import { SharedModule } from '../../contrainte/config/shared/shared.module';

@NgModule({
  imports: [CommonModule, AuthenticationRoutingModule, SharedModule],
  declarations: [LoginComponent]
})
export class AuthenticationModule {}
