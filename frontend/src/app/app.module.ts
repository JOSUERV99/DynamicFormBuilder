import { LoginComponent } from './auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { TemplateBuilderRoutingModule } from './template-builder/template-builder-routing.module';
import { FormRoutingModule } from './form/form-routing.module';
import { BrowserAnimationsModule }from "@angular/platform-browser/animations" 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AuthRoutingModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TemplateBuilderRoutingModule,
    FormRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
