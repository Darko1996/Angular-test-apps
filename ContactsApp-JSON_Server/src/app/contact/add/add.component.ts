import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from './../services/contact.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addContactForm: FormGroup;
  status: string;

  constructor(
    private contactService: ContactService,
    private router: Router
    ) {}

  ngOnInit() {
    this.addContactForm = new FormGroup ({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      emails: new FormArray([new FormControl(null, Validators.required)]),
      phones: new FormArray([new FormControl(null, Validators.required)]),
    });

    this.contactService.modalMsg.subscribe(msg => this.status = msg);
  }

  AddContact() {
    const firstName = this.addContactForm.value.firstName;
    const lastName = this.addContactForm.value.lastName;
    const emails = this.addContactForm.value.emails;
    const phones = this.addContactForm.value.phones;

    const contact = new Contact(firstName, lastName, emails, phones);

    this.contactService.addContact(contact);
    this.router.navigate(['/']);
    this.contactService.changeModalMsg('added');

    this.removeErrOnTime();
  }

  onAddEmail() {
    (this.addContactForm.get('emails') as FormArray).push(new FormControl(null));
  }

  deleteEmail(index) {
    (this.addContactForm.get('emails') as FormArray).removeAt(index);
  }

  onAddPhone() {
    (this.addContactForm.get('phones') as FormArray).push(new FormControl(null));
  }

  deletePhone(index) {
    (this.addContactForm.get('phones') as FormArray).removeAt(index);
  }

  removeErrOnTime() {
    setTimeout(() => {
      this.contactService.changeModalMsg('');
    }, 2000);
  }
}
