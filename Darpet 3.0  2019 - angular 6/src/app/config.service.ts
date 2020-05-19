import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/observable';
import { of } from 'rxjs/internal/observable/of';
import {environment} from '../environments/environment';
import {NgForm} from '@angular/forms';
import {catchError, tap} from 'rxjs/operators';
import {HttpHeaders, HttpClient} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = environment.emailUrl;
  emailUrl = environment.emailUrl;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  sendMessage(formData: NgForm): Observable<any> {
    return this.http.post<any>(`${this.emailUrl}`, formData, httpOptions).pipe(
      tap(
        message => console.log(message)
      ),
      catchError(this.handleError('Sending Message', []))
    );
  }

}
