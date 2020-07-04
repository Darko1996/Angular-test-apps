import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  status: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.modalMsg.subscribe(msg => this.status = msg);
  }

}
