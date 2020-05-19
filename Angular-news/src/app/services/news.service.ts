import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  /*---- NPM RUN API for Mock data ---- */

  getNews() {
    return this.http.get<any>('/api/news');
  }
}
