import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IContact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api = 'http://localhost:3000';
  modalMsgSource = new BehaviorSubject<string>('');
  modalMsg = this.modalMsgSource.asObservable();

  constructor(private http: HttpClient) {}

  changeModalMsg(msg: string) {
    this.modalMsgSource.next(msg);
  }

  getContacts(): Observable<IContact> {
    return this.http.get<any>(this.api + '/contacts');
  }

  addContact(contact: IContact) {
    this.http.post(this.api + '/contacts/', contact).subscribe(resp => {
      console.log(resp);
    },
    (err) => {
      console.log(err);
    });
  }

  getContactById(id: number): Observable<IContact> {
    return this.http.get<any>(this.api + '/contacts/' + id);
  }

  updateContact(contact: IContact, id) {
    return this.http.put<any>(this.api + '/contacts/' + id, contact).subscribe(resp => {
      console.log(resp);
    },
    (err) => {
      console.log(err);
    });
  }

  deleteContact(id) {
    return this.http.delete(this.api + '/contacts/' + id).subscribe(resp => {
      console.log(resp);
    },
    (err) => {
      console.log(err);
    });
  }
}
