import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { Contact, IContact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  addContactForm: FormGroup;
  contact$: Observable<IContact>;
  contactId: number;
  selContactEmails: string[];
  selContactPhones: number[];

  status: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.addContactForm = new FormGroup ({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      emails: new FormArray([], (Validators.required)),
      phones: new FormArray([], (Validators.required)),
    });

    this.contact$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      this.contactId = parseInt(params.get('id'));
      return this.contactService.getContactById(this.contactId);
     }));

    this.contact$.subscribe(selContact => {
       this.addContactForm.get('firstName').setValue(selContact.first_name);
       this.addContactForm.get('lastName').setValue(selContact.last_name);
       this.selContactEmails = selContact.emails;
       this.selContactPhones = selContact.phones;

       // get emails from URL and putting it into existing array of emails
       this.selContactEmails.forEach(element => {
        (this.addContactForm.get('emails') as FormArray).push(new FormControl(element));
       });

       // get phones from URL and putting it into existing array of phones
       this.selContactPhones.forEach(element => {
        (this.addContactForm.get('phones') as FormArray).push(new FormControl(element));
       });
     });

    this.contactService.modalMsg.subscribe(msg => this.status = msg);

  }

  EditContact() {
    const firstName = this.addContactForm.value.firstName;
    const lastName = this.addContactForm.value.lastName;
    const emails = this.addContactForm.value.emails;
    const phones = this.addContactForm.value.phones;

    const contact = new Contact(firstName, lastName, emails, phones);

    this.contactService.updateContact(contact, this.contactId);
    this.contactService.changeModalMsg('updated');
    this.removeErrOnTime();

    this.router.navigate(['/']);
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

  delContact() {
    this.contactService.deleteContact(this.contactId);
    this.contactService.changeModalMsg('deleted');
    this.removeErrOnTime();
    this.router.navigate(['/']);
  }

  removeErrOnTime() {
    setTimeout(() => {
      this.contactService.changeModalMsg('');
    }, 2000);
  }
}
