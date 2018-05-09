import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEditorModule } from 'ngx-editor';
import { DndModule } from 'ngx-dnd';

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
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ScrollbarModule,
    MatInputModule,
    MatExpansionModule,
    NgxEditorModule,
    DndModule.forRoot()
  ],
  declarations: [],
  exports: [
    ButtonsModule,
    BsDropdownModule,
    CollapseModule,
    ModalModule,
    PaginationModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    ScrollbarModule,
    MatInputModule,
    MatExpansionModule,
    NgxEditorModule,
    DndModule
  ]
})
export class SharedModule {}
