import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LoaderModule } from '../../../presentation/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    DndModule.forRoot(),
    LoaderModule
  ],
  declarations: [],
  exports: [
    FormsModule,
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
    DndModule,
    LoaderModule
  ]
})
export class SharedModule {}
