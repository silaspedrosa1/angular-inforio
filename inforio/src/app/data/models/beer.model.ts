import { HttpParams } from '@angular/common/http';

interface IBeer {
  id?: number;
  name?: string;
  yeast?: string;
  imageUrl?: string;
  abv?: number;
  ibu?: number;
  firstBrewed?: Date;
}

export class Beer implements IBeer {
  id: number;
  name: string;
  yeast: string;
  imageUrl: string;
  abv: number;
  ibu: number;
  firstBrewed: Date;

  constructor(props: IBeer) {
    Object.keys(props).forEach(key => (this[key] = props[key]));
  }

  static decode(obj: any): Beer {
    const props: IBeer = {};

    if (typeof obj['id'] === 'number') props.id = obj['id'];
    if (typeof obj['name'] === 'string') props.name = obj['name'];
    if (typeof obj['yeast'] === 'string') props.yeast = obj['yeast'];
    if (typeof obj['image_url'] === 'string') props.imageUrl = obj['image_url'];
    if (typeof obj['abv'] === 'number') props.abv = obj['abv'];
    if (typeof obj['ibu'] === 'number') props.ibu = obj['ibu'];
    if (typeof obj['first_brewed'] === 'number') props.firstBrewed = new Date();

    return new Beer(props);
  }
}

interface IBeerQuery {
  abvGt?: number;
  abvLt?: number;
  ibuGt?: number;
  ibuLt?: number;
  beerName?: string;
  brewedBefore?: Date;
  brewedAfter?: Date;
}

export class BeerQuery {
  abvGt: number;
  abvLt: number;
  ibuGt: number;
  ibuLt: number;
  beerName: string;
  brewedBefore: Date;
  brewedAfter: Date;

  constructor(props: IBeerQuery) {
    Object.keys(props).forEach(key => (this[key] = props[key]));
  }

  composeHttpParams(httpParams: HttpParams): HttpParams {
    if (this.abvGt != null) httpParams = httpParams.set('abvGt', this.abvGt.toString());
    if (this.abvLt != null) httpParams = httpParams.set('abvLt', this.abvLt.toString());
    if (this.ibuGt != null) httpParams = httpParams.set('ibuGt', this.ibuGt.toString());
    if (this.ibuLt != null) httpParams = httpParams.set('ibuLt', this.ibuLt.toString());
    if (this.beerName != null) httpParams = httpParams.set('beerName', this.beerName);
    if (this.brewedBefore != null) httpParams = httpParams.set('brewedBefore', this.brewedBefore.toString());
    if (this.brewedAfter != null) httpParams = httpParams.set('brewedAfter', this.brewedAfter.toString());

    return httpParams;
  }
}
