### Criando o app

```
ng new info rio
npm install --save @ng-bootstrap/ng-bootstrap bootstrap
```

No app.module:

```
imports: [NgbModule, ...],
```

### Husky

npm install husky prettier pretty-quick --save-dev

adicionar ao package.json:

```
"husky": {
    "hooks": {
      "pre-commit": "run-s format:fix lint"
    }
  },
```

adicionar aos scripts do package.json:

```
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "format:fix": "pretty-quick --staged",
    "format:check": "prettier --config ./.prettierrc --list-different \"src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}\""
  }
```

criar arquivo .prettierrc:

```
{
  "printWidth": 120,
  "singleQuote": true,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true
}
```

instalar a extensão do prettier no vs code!!

### Rotas e componentes iniciais

No app.component.html:

```
<router-outlet></router-outlet>
```

Criar o home

```
npx ng g component home
```

Adicionar o home nas rotas:

```
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];
```

Criar componente async:

```
npx ng g component async
```

Adicionar async nas rotas:

```
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "async",
        component: AsyncComponent
      }
    ]
  }
];
```

Adicionar link para async na home:

```
<p>home works!</p>
<a routerLink="/async">async</a>
```

- add esquema css (funcional primeiro, aos poucos migrando para SMACSS, BEM, etc.)

### Fake backend

Criar o arquivo interceptor:

```
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.indexOf('/books/possibilities') !== -1 && method === 'GET':
          return booksPossibilities();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function booksPossibilities() {
      return ok({
        data: [
          {
            id: 1,
            title: 'Programação Funcional'
          },
          {
            id: 2,
            title: 'Elm - a linguagem do futuro'
          }
        ]
      });
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

```

Colocar o provider do interceptor no AppModule

```
@NgModule({
  declarations: [AppComponent, HomeComponent, AsyncComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### async, promises, observables

criar o modal de escolha de possibilidades:
`ng g component async/possibilities`

adicionar na lista de entryComponents no AppModule:

```
entryComponents: [PossibilitiesComponent]
```

### Criar um spinner, usaremos bastante

`npx ng g shared/components/spinner`

`spinner.component.ts`:

```
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() message = '';

  constructor() {}

  ngOnInit() {}
}
```

`spinner.component.html`:

```
<div class="container">
  <div class="row">
    <div id="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="loading"></div>
    </div>

    <p class="spinner-message" *ngIf="message && message !== ''">
      {{ message }}
    </p>
  </div>
</div>
```

`spinner.component.scss`:

```
#loader {
  bottom: 0;
  height: 175px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 175px;
}

#loader .dot {
  bottom: 0;
  height: 100%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 87.5px;
}

#loader .dot::before {
  border-radius: 100%;
  content: '';
  height: 87.5px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(0);
  width: 87.5px;
}

#loader .dot:nth-child(7n + 1) {
  transform: rotate(45deg);
}

#loader .dot:nth-child(7n + 1)::before {
  animation: 0.8s linear 0.1s normal none infinite running load;
  background: #00ff80 none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 2) {
  transform: rotate(90deg);
}

#loader .dot:nth-child(7n + 2)::before {
  animation: 0.8s linear 0.2s normal none infinite running load;
  background: #00ffea none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 3) {
  transform: rotate(135deg);
}

#loader .dot:nth-child(7n + 3)::before {
  animation: 0.8s linear 0.3s normal none infinite running load;
  background: #00aaff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 4) {
  transform: rotate(180deg);
}

#loader .dot:nth-child(7n + 4)::before {
  animation: 0.8s linear 0.4s normal none infinite running load;
  background: #0040ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 5) {
  transform: rotate(225deg);
}

#loader .dot:nth-child(7n + 5)::before {
  animation: 0.8s linear 0.5s normal none infinite running load;
  background: #2a00ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 6) {
  transform: rotate(270deg);
}

#loader .dot:nth-child(7n + 6)::before {
  animation: 0.8s linear 0.6s normal none infinite running load;
  background: #9500ff none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 7) {
  transform: rotate(315deg);
}

#loader .dot:nth-child(7n + 7)::before {
  animation: 0.8s linear 0.7s normal none infinite running load;
  background: magenta none repeat scroll 0 0;
}

#loader .dot:nth-child(7n + 8) {
  transform: rotate(360deg);
}

#loader .dot:nth-child(7n + 8)::before {
  animation: 0.8s linear 0.8s normal none infinite running load;
  background: #ff0095 none repeat scroll 0 0;
}

#loader .loading {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  bottom: -40px;
  height: 20px;
  left: 0;
  position: absolute;
  right: 0;
  width: 180px;
}

@keyframes load {
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes load {
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.spinner-message {
  text-align: center;
}
```

Referência: _https://christianlydemann.com/four-ways-to-create-loading-spinners-in-an-angular-app/_

### Explorando callbacks, modais, requisicões e fluxo assícrono

Criar componentes:

```
npx ng g component async
npx ng g component async/amount
npx ng g component async/barcode
npx ng g component async/confirmation
npx ng g component async/possibilities
```

Colocar todo mundo no AppModule como entryComponents:

```
entryComponents: [PossibilitiesComponent, BarcodeComponent, AmountComponent, ConfirmationComponent]
```

Atualizar o bfake backend para as novas requisicões:

```
case url.indexOf('/books/possibilities') !== -1 && method === 'GET':
  return booksPossibilities();
case url.endsWith('/devolution') && method === 'POST':
  return devolution();

...

function devolution() {
      return ok({});
    }

    function booksPossibilities() {
      return ok({
        data: [
          {
            id: 1,
            title: 'Programação Funcional',
            available: 2
          },
          {
            id: 2,
            title: 'Elm - a linguagem do futuro',
            available: 3
          }
        ]
      });
    }
```

Fazer códigos dos modais:

1. barcode:

```
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {
  callback: (barcode: string) => void;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  submit(barcode: string) {
    this.activeModal.close();
    this.callback(barcode);
  }
}
```

e

```
<input type="text" #barcodeInput (keyUp.enter)="submit(barcodeInput.value)" />
<span>{{ barcodeInput.value }}</span>
<button class="btn btn-primary" (click)="submit(barcodeInput.value)">Devolver</button>

```

2. amount:

```
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  book: any;
  callback: (amount: number) => void;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  dismiss() {
    this.activeModal.dismiss();
    this.callback(null);
  }

  submit(amount: string) {
    console.log('chosen amount', amount);
    this.activeModal.dismiss();
    this.callback(parseInt(amount));
  }
}

```

e

```
<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">Escolha a quantidade</h4>
  <button type="button" class="close" aria-label="Close" (click)="dismiss()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body container-fluid">
  <input type="number" #amountInput (keyup.enter)="submit(amountInput.value)" />
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="submit(amountInput.value)">Devolver</button>
</div>

```

3. confirmation:

```
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  title: string;
  message: string;
  callback: (confirmed: boolean) => void;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  cancel() {
    this.activeModal.dismiss();
    this.callback(false);
  }

  confirm() {
    this.activeModal.dismiss();
    this.callback(true);
  }
}

```

e

```
<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">{{ title }}</h4>
  <button type="button" class="close" aria-label="Close" (click)="cancel()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body container-fluid">
  <h3>{{ message }}</h3>
</div>
<div class="modal-footer container-fluid">
  <div class="row justify-content-end">
    <button type="button" class="btn btn-outline-primary" (click)="cancel()">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="confirm()">Confirmar</button>
  </div>
</div>

```

4. possibilities:

```
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-possibilities',
  templateUrl: './possibilities.component.html',
  styleUrls: ['./possibilities.component.scss']
})
export class PossibilitiesComponent implements OnInit {
  callback: (book) => void;
  books: any[];
  selectedBook: any;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  dismiss() {
    this.activeModal.dismiss();
    this.callback(null);
  }

  submit() {
    this.activeModal.dismiss();
    this.callback(this.selectedBook);
  }

  select(book) {
    this.selectedBook = book;
  }
}

```

e

```
<div class="modal-header">
  <h4 class="modal-title" id="modal-basic-title">Possibilities</h4>
  <button type="button" class="close" aria-label="Close" (click)="dismiss()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body container-fluid">
  <div
    style="height: 3rem;"
    class="row align-items-center border bg-primary-hover"
    *ngFor="let book of books"
    (click)="select(book)"
    [ngClass]="{ 'bg-primary': selectedBook === book }"
  >
    <div class="col">
      <span>{{ book.title }}</span>
    </div>
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="submit()">Save</button>
</div>

```

Por último, fazer o componente async, que gerencia o fluxo entre modais utilizando callbacks:

```
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { PossibilitiesComponent } from './possibilities/possibilities.component';
import { AmountComponent } from './amount/amount.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BarcodeComponent } from './barcode/barcode.component';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class AsyncComponent implements OnInit {
  barcode: string;

  barcodeRequestError = false;
  devolutionRequestError = false;
  devolutionRequestSuccess = false;

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit() {}

  read() {
    const barcodeModalRef = this.modalService.open(BarcodeComponent);
    const barcodeComponent: BarcodeComponent = barcodeModalRef.componentInstance;
    barcodeComponent.callback = (barcode: string) => {
      if (barcode != null) {
        this.http.get(`test.com/books/possibilities?barcode=${this.barcode}`).subscribe(
          response => {
            const books = response['data'];
            const ref = this.modalService.open(PossibilitiesComponent);
            const component: PossibilitiesComponent = <PossibilitiesComponent>ref.componentInstance;
            component.books = books;
            component.callback = book => {
              if (book != null) {
                const amountModalRef = this.modalService.open(AmountComponent);
                const amountComponent: AmountComponent = amountModalRef.componentInstance;
                amountComponent.book = book;
                amountComponent.callback = (amount: number) => {
                  if (amount > book['available']) {
                    console.log('amount > available');
                    const confirmationModalRef = this.modalService.open(ConfirmationComponent);
                    const confirmationComponent: ConfirmationComponent = confirmationModalRef.componentInstance;
                    confirmationComponent.title = 'Atenção!';
                    confirmationComponent.message = 'Deseja realmente devolver 3 livros extras?';
                    confirmationComponent.callback = (confirmation: boolean) => {
                      console.log('callback confirmation', confirmation);
                      if (confirmation) {
                        this.http
                          .post(`test.com/books/${book.id}/devolution`, {
                            amount
                          })
                          .subscribe(
                            response => {
                              this.devolutionRequestSuccess = true;
                              setTimeout(_ => (this.devolutionRequestSuccess = false), 5000);
                            },
                            error => {
                              this.devolutionRequestError = true;
                              setTimeout(_ => (this.devolutionRequestError = false), 5000);
                            }
                          );
                      }
                    };
                  } else if (amount > 0) {
                    console.log('amount:', amount);
                    this.http
                      .post(`test.com/books/${book.id}/devolution`, {
                        amount
                      })
                      .subscribe(
                        response => {
                          this.devolutionRequestSuccess = true;
                          setTimeout(_ => (this.devolutionRequestSuccess = false), 5000);
                        },
                        error => {
                          this.devolutionRequestError = true;
                          setTimeout(_ => (this.devolutionRequestError = false), 5000);
                        }
                      );
                  }
                };
              }
            };
          },
          error => {
            this.barcodeRequestError = true;
            setTimeout(_ => (this.barcodeRequestError = false), 5000);
          }
        );
      }
    };
  }
}
```

e

```
<h1>Devolução</h1>
<button class="btn btn-primary" (click)="read()">Ler código de barras</button>
<ngb-alert *ngIf="barcodeRequestError" type="danger" (close)="barcodeRequestError = false"
  >Erro ao buscar por código de barras</ngb-alert
>
<ngb-alert *ngIf="devolutionRequestSuccess" type="success" (close)="devolutionRequestSuccess = false"
  >Livros devolvidos com sucesso!</ngb-alert
>
<ngb-alert *ngIf="devolutionRequestError" type="danger" (close)="devolutionRequestError = false"
  >Erro ao devolver livros</ngb-alert
>
<app-spinner *ngIf="busy"></app-spinner>
```

Atentar para os status de erro, de loading e para a dependência entre callbacks.

### Usando Promises

- fake ftd callback
  - read barcode
  - http: pega lista de livros possiveis
  - modal de escolha
  - modal de quantidade
  - http: livros e valores
- fake ftd promise
- fake ftd observable

### API - services, models

### Auth

### Listagem

### Form

### Tratamento de erros
