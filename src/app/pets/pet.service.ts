import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class PetService {
  constructor(protected http: HttpClient) {}
  public atxAACUrl = 'https://data.austintexas.gov/resource/hye6-gvq2.json?type=Cat';

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
   }

  getPets(): Observable<any> {
    //?$limit=15&$offset=0
    return this.http.get(`${this.atxAACUrl}`)
       .catch(this.handleError);
  }
}