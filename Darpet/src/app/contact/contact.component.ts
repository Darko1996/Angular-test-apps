import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {FormBuilder, NgForm, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  sending: boolean;
  contactusForm: FormGroup;

  constructor(private contactService: ConfigService, private fb: FormBuilder) { }

  ngOnInit() {
    /* for email-contact */ 
    this.contactusForm = this.fb.group({
      email : [null, [Validators.required, Validators.email]],
      message : [null, Validators.required],
      name : [null, Validators.required]
    });
    this.sending = false;
  }

  /*
  sendMessage(formData: NgForm) {
    console.log(formData);
  } */

  sendMessage(formData: NgForm) {
    this.sending = true;
    console.log(formData);
    this.contactService.sendMessage(formData).subscribe(
      data => console.log(data)
    );
    alert("Message sent!")

    setTimeout(() => {
     this.sending = false;
    }, 1000);
  }



}
