import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "onlinestore";

  ngOnInit(): void {
    //firebase auth
    firebase.initializeApp({
      apiKey: "AIzaSyBfQkaRaFHOHxerJrCZCSVjM5cXkEMgrow",
      authDomain: "onlinestore-8d987.firebaseapp.com"
    });
  }
}
