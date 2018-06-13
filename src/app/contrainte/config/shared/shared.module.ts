import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
import { QuillModule } from 'ngx-quill';

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
    LoaderModule,
    MatSlideToggleModule,
    CommunModule,
    MatCheckboxModule,
    MatRadioModule,
    ColorPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTooltipModule,
    ProgressbarModule.forRoot(),
    MatMenuModule,
    NgxDnDModule,
    MatProgressBarModule,
    QuillModule,
    MatProgressSpinnerModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
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
    LoaderModule,
    MatSlideToggleModule,
    CommunModule,
    MatCheckboxModule,
    MatRadioModule,
    ColorPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTooltipModule,
    ProgressbarModule,
    MatMenuModule,
    NgxDnDModule,
    MatProgressBarModule,
    ProgressbarModule,
    QuillModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {}
