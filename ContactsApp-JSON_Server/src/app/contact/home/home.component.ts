import { Component, OnInit } from '@angular/core';
import { ContactService } from './../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contacts: any;
  status: string;
  errTimeout: boolean;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe((data => {
      this.contacts = data;
    }));

    this.contactService.modalMsg.subscribe(msg => this.status = msg);
  }
}
