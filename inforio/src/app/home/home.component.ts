import { Component, OnInit } from '@angular/core';
import { BeerService, Tarefa, Sucesso, Falha, EmProgresso } from '../data/services/beer.service';
import { BeerQuery, IBeer } from '../data/models/beer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  beerList: Tarefa<IBeer[]> = new EmProgresso();
  query: BeerQuery = new BeerQuery();

  queryTimeout;

  constructor(private beerService: BeerService) {}

  async ngOnInit() {
    this.query.page = 1;
    this.query.pageSize = 5;
    this.query.abvGt = 10;

    const tarefa = await this.beerService.index(this.query);
    this.beerList = tarefa;
  }

  refresh() {
    if (this.queryTimeout != null) clearTimeout(this.queryTimeout);

    this.queryTimeout = setTimeout(async () => {
      this.beerList = new EmProgresso();
      const tarefa = await this.beerService.index(this.query);
      this.beerList = tarefa;
    }, 1000);
  }

  async voltar() {
    if (this.query.page > 1) this.query.page -= 1;
    console.log('voltou: ', this.query.page);
    this.refresh();
  }

  async avancar() {
    this.query.page += 1;
    console.log('avancou: ', this.query.page);
    this.refresh();
  }
}
