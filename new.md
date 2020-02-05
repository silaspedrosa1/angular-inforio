ng new info rio
npm install --save @ng-bootstrap/ng-bootstrap

No app.module:

```
imports: [NgbModule, ...],
```

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

- add git commit rochedo sergio
- add bootstrap css
- add esquema css (funcional primeiro, aos poucos migrando para SMACSS, BEM, etc.)

### async, promises, observables

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
