import { ContactService } from '../contact/services/contact.service';
import { IContact } from '../contact/models/contact';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contacts:Observable<IContact[]> = null; //data

  constructor(private contactService: ContactService,
              private router: Router) {}

  ngOnInit() {
    this.contacts = this.contactService.getAllContacts();
  }

  editContact(contact):void{
    this.router.navigate(['edit/'+ contact.id]);
  }
  deleteContact(contact):void{
    this.contactService.deleteContact(contact);
  }
}
