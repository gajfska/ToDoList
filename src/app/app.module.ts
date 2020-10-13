import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table/table-row/table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
