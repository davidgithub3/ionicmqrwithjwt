import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AddGroceryPage } from '../add-grocery/add-grocery.page';
import { EditGroceryPage } from '../edit-grocery/edit-grocery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  entryComponents: [
    AddGroceryPage,
    EditGroceryPage
  ],
  declarations: [HomePage, AddGroceryPage, EditGroceryPage]
})

export class HomePageModule { }
