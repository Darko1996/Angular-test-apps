import { Router } from '@angular/router';
import { ContactService } from '../contact/services/contact.service';
import { Contact } from '../contact/models/contact';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor( private contactService: ContactService, private router: Router) {}

  ngOnInit() {
      this.contactForm = new FormGroup ({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'emails': new FormArray([]),
      'phones': new FormArray([]),
    });

    //Pushing new email and phone to arrays
    (<FormArray>this.contactForm.get('emails')).push(new FormControl(null, Validators.required));
    (<FormArray>this.contactForm.get('phones')).push(new FormControl(null, Validators.required));
  }

  save($event):void{
      this.saveContact();
      this.router.navigate((['/']));
  }

  private saveContact(){
    const contact = new Contact(undefined,undefined,undefined,undefined,undefined,undefined); //Expected 6 arguments, but got 0 error with version of cli

    contact.first_name = this.contactForm.get('first_name').value;
    contact.last_name = this.contactForm.get('last_name').value;

    this.contactService.addNewContact(contact);
    console.log(contact);
  }

  //adding emails
  onAddEmail(){
    (<FormArray>this.contactForm.get('emails')).push(new FormControl(null));
  }

  onDeleteEmail(index:number){
   (<FormArray>this.contactForm.get('emails')).removeAt(index);
  }

  //adding phones
  onAddPhone(){
    (<FormArray>this.contactForm.get('phones')).push(new FormControl(null));
  }

  onDeletePhone(index:number){
   (<FormArray>this.contactForm.get('phones')).removeAt(index);
  }
   
}
