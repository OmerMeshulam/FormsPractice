import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CheckboxSortPipe } from './checkbox-sort.pipe';
import { LoadingSpinnerComponent } from './features/loading-spinner.component';

@NgModule({
  declarations: 
  [
    AppComponent,
    CheckboxSortPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
