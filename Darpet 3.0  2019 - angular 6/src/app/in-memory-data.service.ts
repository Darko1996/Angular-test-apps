import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  constructor() { }
  //ovo nam nije potrebno za email-contact
  createDb() {
    
    const users = [
      {id: 11, name: 'Darko', email: 'darkolesevic1@hotmail.com'}
    ];
    return {users};

  }
}
