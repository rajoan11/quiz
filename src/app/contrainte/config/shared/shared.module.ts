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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';

import {
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatNativeDateModule
} from '@angular/material';
import { ScrollbarModule } from 'ngx-scrollbar';
import { LoaderModule } from '../../../presentation/loader/loader.module';
import { CommunModule } from '../../../commun/commun.module';

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
    LoaderModule,
    MatSlideToggleModule,
    CommunModule,
    MatCheckboxModule,
    MatRadioModule,
    ColorPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule
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
    LoaderModule,
    MatSlideToggleModule,
    CommunModule,
    MatCheckboxModule,
    MatRadioModule,
    ColorPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule
  ]
})
export class SharedModule {}
