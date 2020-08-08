import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://127.0.0.1:8000';
  constructor(private _http: HttpClient) { }

  getPropertyList(query?: string): Observable<any> {
    // return this._http.get<any>(`${this.baseUrl}'/property/?query=' + ${query}}`);
    return this._http.get(this.baseUrl + '/property')
      .pipe(
        map((response: Response) => response)
      );
  }
}
