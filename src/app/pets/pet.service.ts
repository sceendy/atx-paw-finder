import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class PetService {
  constructor(protected http: HttpClient) {}
  public atxAACUrl = 'https://data.austintexas.gov/resource/hye6-gvq2.json';

  private handleError (error: any) {
    const errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getPets(filters: Object): Observable<any> {
    const filterString = Object.keys(filters)
      .filter(k => filters[k] != '')
      .map(k => `${k}=${filters[k]}`)
      .join('&');

    return this.http.get(`${this.atxAACUrl}?${filterString ? filterString : ''}`)
       .catch(this.handleError);
  }
// tslint:disable-next-line:eofline
}