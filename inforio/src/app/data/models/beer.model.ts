import { HttpParams } from '@angular/common/http';
import { asapScheduler } from 'rxjs';

export interface IBeer {
  id?: number;
  name?: string;
  yeast?: string;
  imageUrl?: string;
  abv?: number;
  ibu?: number;
  firstBrewed?: Date;
}

// export class Beer implements IBeer {
//   id: number;
//   name: string;
//   yeast: string;
//   imageUrl: string;
//   abv: number;
//   ibu: number;
//   firstBrewed: Date;

//   constructor(props: IBeer) {
//     Object.keys(props).forEach(key => (this[key] = props[key]));
//   }

//   static decode(obj: any): Beer {
//     const props: IBeer = {};

//     if (typeof obj['id'] === 'number') props.id = obj['id'];
//     if (typeof obj['name'] === 'string') props.name = obj['name'];
//     if (typeof obj['yeast'] === 'string') props.yeast = obj['yeast'];
//     if (typeof obj['image_url'] === 'string') props.imageUrl = obj['image_url'];
//     if (typeof obj['abv'] === 'number') props.abv = obj['abv'];
//     if (typeof obj['ibu'] === 'number') props.ibu = obj['ibu'];
//     if (typeof obj['first_brewed'] === 'number') props.firstBrewed = new Date();

//     return new Beer(props);
//   }
// }

export class BeerQuery {
  constructor(
    public abvGt: number = null,
    public abvLt: number = null,
    public ibuGt: number = null,
    public ibuLt: number = null,
    public beerName: string = null,
    public brewedBefore: Date = null,
    public brewedAfter: Date = null,
    public page: number = null,
    public pageSize: number = null
  ) {}

  composeHttpParams(httpParams: HttpParams): HttpParams {
    if (this.abvGt != null) httpParams = httpParams.set('abv_gt', this.abvGt.toString());
    if (this.abvLt != null) httpParams = httpParams.set('abv_lt', this.abvLt.toString());
    if (this.ibuGt != null) httpParams = httpParams.set('ibu_gt', this.ibuGt.toString());
    if (this.ibuLt != null) httpParams = httpParams.set('ibu_lt', this.ibuLt.toString());
    if (this.beerName != null) httpParams = httpParams.set('beer_name', this.beerName);
    if (this.brewedBefore != null) httpParams = httpParams.set('brewed_before', this.brewedBefore.toString());
    if (this.brewedAfter != null) httpParams = httpParams.set('brewed_after', this.brewedAfter.toString());

    if (this.page != null) httpParams = httpParams.set('page', this.page.toString());
    else httpParams = httpParams.set('page', '1');

    if (this.pageSize != null) httpParams = httpParams.set('per_page', this.pageSize.toString());
    else httpParams = httpParams.set('per_page', '10');

    return httpParams;
  }
}
