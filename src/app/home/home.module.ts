import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu/menu.component';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ModalComponent } from './components/modal/modal.component';
import { EllipsisPipe } from '../shared/pipes/ellipsis.pipe';
import { ViewMenuComponent } from './view-menu/view-menu.component';
import { ResultModalComponent } from './components/result-modal/result-modal.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ModalComponent,
    EllipsisPipe,
    ViewMenuComponent,
    ResultModalComponent,
    DeleteDialogComponent,
    EditMenuComponent,
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    // MatSelectModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class HomeModule { }
