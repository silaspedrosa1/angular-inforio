import { Injectable } from '@angular/core';
import { BeerQuery, Beer } from '../models/beer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  constructor(private http: HttpClient) {}

  index(query: BeerQuery = new BeerQuery({})): Observable<Beer[]> {
    return this.http
      .get('https://api.punkapi.com/v2/beers', {
        params: query.composeHttpParams(new HttpParams())
      })
      .pipe(
        map((data: any) => {
          if (Array.isArray(data)) {
            return data.map(Beer.decode);
          } else {
            return [];
          }
        })
      );
  }
}
