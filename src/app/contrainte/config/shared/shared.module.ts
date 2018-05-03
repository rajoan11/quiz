import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { ScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ScrollbarModule,
    MatInputModule
  ],
  declarations: [],
  exports: [ButtonsModule,BsDropdownModule,CollapseModule,BrowserAnimationsModule, MatSortModule,
    MatTableModule,MatSelectModule,ScrollbarModule,MatInputModule]

})
export class SharedModule { }
