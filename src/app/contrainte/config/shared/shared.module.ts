import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxEditorModule } from 'ngx-editor';
import {
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule
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
    MatInputModule,
    MatExpansionModule,
    NgxEditorModule 
  ],
  declarations: [],
  exports: [ButtonsModule,BsDropdownModule,CollapseModule,BrowserAnimationsModule, MatSortModule,
    MatTableModule,MatSelectModule,ScrollbarModule,MatInputModule,MatExpansionModule,NgxEditorModule]

})
export class SharedModule { }
