import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { IContact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  private contacts: Array<Contact> = [
    { first_name: "Afonso", last_name: "Pinto", emails: ["mail01@gmail.com", "mail02@gmail.com"], phones: [123234566, 123234567, 123234568], photo: "http://lorempixel.com/400/300/people/", id:1 },
    { first_name: "Alexandre", last_name: "Paiva", emails: ["mail01@gmail.com"], phones: [123234560, 123234561], photo: null, id:2 },
    { first_name: "Oea",last_name: "Romana",emails: ["mail01@gmail.com", "mail02@gmail.com"],phones: [123234566, 123234567, 123234568],photo: "http://lorempixel.com/400/300/people/",id:3 },
    { first_name: "Nuria",last_name: "Pelayo",emails: ["mail01@gmail.com", "mail02@gmail.com"],phones: [123234568],photo: "http://lorempixel.com/400/300/people/",id:4 },
    { first_name: "Lisandro",last_name: "Matos",emails: ["mail01@gmail.com", "mail02@gmail.com"],phones: [123234566, 123234567],photo: null,id:5 }
  ];

  getAllContacts():Observable<IContact[]>{
    return of(this.contacts);
  };

  getContactById(id:number):Observable<IContact>{
    var contact = this.contacts.find(item => item.id === id);
    return of(contact);
  };
  
  addNewContact(contact:IContact):void{
    this.contacts.sort(item => item.id);
    contact.id = this.contacts.length + 1;

    this.contacts.push(contact);
  };

  deleteContact(contact:IContact):IContact[]{
    const index = this.contacts.findIndex(item => item.id === contact.id);
    const deletedItem = this.contacts.splice(index,1);
    return deletedItem;
  }

  updateContact(contact:IContact):void{
    const index = this.contacts.findIndex(item => item.id === contact.id);
    this.contacts[index] = contact;
  }

}
