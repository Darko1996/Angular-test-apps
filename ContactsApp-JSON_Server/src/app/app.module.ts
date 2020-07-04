import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './contact/add/add.component';
import { EditComponent } from './contact/edit/edit.component';
import { HomeComponent } from './contact/home/home.component';
import { PopupComponent } from './contact/modals/popup/popup.component';
import { NavbarComponent } from './contact/navbar/navbar.component';
import { ContactService } from './contact/services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EditComponent,
    HomeComponent,
    AddComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
