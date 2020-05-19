import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import {environment} from '../environments/environment';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import {AngularFireDatabaseModule} from 'angularfire2/database'; // OVO OBAVEZNO DODATNO DA SE UBACI DA BI RADILO

import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

import { UploadService } from './services/upload-service';
import { ImageService } from './services/image-service';

import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    ContactComponent,
    AboutUsComponent,
    FooterComponent,
    HomeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule, // ovo sto mora da se ubaci za auth
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // email

    CrystalLightboxModule,// lightbox

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    ),

    // za firebase bazu podataka
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard, ImageService, UploadService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
