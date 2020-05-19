import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact/services/contact.service';
import { IContact } from '../contact/models/contact';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Contact } from '../contact/models/contact';
import { isNullOrUndefined } from 'util';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  contact$: Observable<IContact>; 
  // contactForm: FormGroup;
  contactForm = this.fb.group({});

  constructor( private contactService: ContactService,
               private route: ActivatedRoute,
               private router: Router, private fb: FormBuilder ) {}

  ngOnInit() {
    this.contactForm = new FormGroup ({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null,Validators.required),
      'id': new FormControl(null,Validators.required),
      'email': new FormArray([]),
      'phone': new FormArray([]),
      
    });

    //passing id from url from home page and subscibe it to new contact$
    this.contact$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.contactService.getContactById(Number.parseInt(params.get('id')))
      ));

      this.contact$.subscribe(contact => {
        if(!isNullOrUndefined(contact)){
          console.log(contact);
        };

        this.contactForm.get('first_name').setValue(contact.first_name);
        this.contactForm.get('last_name').setValue(contact.last_name);

         //setting value of email array to formArray
          this.contactForm.patchValue(contact);
          const control = this.emailFormArray;
          control.controls = [];
          contact.emails.forEach(x => {
            control.push(
              this.fb.group({
                email: x,
              })
            )
          });

          //setting value of phone to formArray
          this.contactForm.patchValue(contact);
          const controlP = this.phoneFormArray;
          controlP.controls = [];
          contact.phones.forEach(y => {
            controlP.push(
              this.fb.group({
                phone: y,
              })
            )
          });

      });
  };

  onAddEmail(){
   (<FormArray>this.contactForm.get('emails')).push(new FormControl(null));
  }

  onDeleteEmail(index:number){
   (<FormArray>this.contactForm.get('emails')).removeAt(index);
  }

  onAddPhone(){
    (<FormArray>this.contactForm.get('phones')).push(new FormControl(null));
  }

  onDeletePhone(index:number){
   (<FormArray>this.contactForm.get('phones')).removeAt(index);
  }

  get emailFormArray() {
      return this.contactForm.controls.email as FormArray;
  }
  get phoneFormArray() {
      return this.contactForm.controls.phone as FormArray;
  }

 save($event):void{
    if(!this.contactForm.valid){
      return;
    };
      this.saveContact();
      this.router.navigate((['/home']));
  };

    private saveContact(){
    const contact$ = new Contact(undefined,undefined,undefined,undefined,undefined,undefined); //Expected 6 arguments, but got 0 error with version of cli

    //setting value to original data
    const fm = this.contactForm.value;
    const emails =  fm.email.map(a => a.email);
    const phones =  fm.phone.map(a => a.phone);

    contact$.id = fm.id;
    contact$.first_name = fm.first_name;
    contact$.last_name = fm.last_name;
    contact$.emails = emails;
    contact$.phones = phones;

    // const personToBeUpdated = {
    //   first_name: fm.first_name,
    //   last_name: fm.last_name,
    //   id: fm.id,
    //   emails: fm.emails,
    //   phones: fm.phones
    // };
    // console.log('Form contact to be saved:', personToBeUpdated);

    this.contactService.updateContact(contact$);
  };
}
