import { AuthGuardService } from './services/auth-guard.service';
import { environment } from "./../environments/environment";
import { AuthService } from "./services/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./shared/header/header.component";
import { CartComponent } from "./cart/cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './footer/footer.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import * as firebase from 'firebase/app';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, CartComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    NgxPaginationModule,

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'onlinestore'), //firebase
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
