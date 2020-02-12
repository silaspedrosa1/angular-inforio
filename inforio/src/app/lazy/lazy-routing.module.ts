import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'aquidentro',
        component: TestComponent
      },
      {
        path: '',
        component: TestComponent
      }
    ]
  }
];

@NgModule({
  exports: []
})
export class LazyRoutingModule {}
