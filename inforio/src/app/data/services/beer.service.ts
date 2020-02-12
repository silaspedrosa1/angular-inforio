import { Injectable } from '@angular/core';
import { BeerQuery, IBeer } from '../models/beer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

export class Tarefa<Coisa = any> {
  get emProgresso(): boolean {
    return this._emProgresso;
  }
  get temErro(): boolean {
    return this.erro != null;
  }
  get foiSucesso(): boolean {
    return !this.emProgresso && !this.temErro;
  }
  get resultado(): Coisa {
    return this._resultado;
  }

  constructor(private _resultado: Coisa, private _emProgresso: boolean, private erro: Error) {}
}

export class Sucesso<Coisa> extends Tarefa<Coisa> {
  constructor(resultado: Coisa) {
    super(resultado, false, null);
  }
}

export class Falha extends Tarefa {
  constructor(erro: Error) {
    super(null, false, erro);
  }
}

export class EmProgresso extends Tarefa {
  constructor() {
    super(null, true, null);
  }
}

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  constructor(private http: HttpClient) {}

  async index(query: BeerQuery = new BeerQuery()): Promise<Tarefa<IBeer[]>> {
    const request = this.http
      .get<IBeer[]>('https://api.punkapi.com/v2/beers', {
        params: query.composeHttpParams(new HttpParams())
      })
      .toPromise();

    try {
      const data = await request;
      return new Sucesso(data);
      // if (Array.isArray(data)) {
      // } else {
      //   return new Falha(new Error('formato inesperado'));
      // }
    } catch (error) {
      return new Falha(new Error('deu alguma coisa errado'));
    }
    //continuacao

    // const data = await request;

    // return this.http
    //   .get('https://api.punkapi.com/v2/beers', {
    //     params: query.composeHttpParams(new HttpParams())
    //   })
    //   .pipe(
    //     map((data: any) => {
    //       if (Array.isArray(data)) {
    //         return data.map(Beer.decode);
    //       } else {
    //         return [];
    //       }
    //     })
    //   );
  }
}
