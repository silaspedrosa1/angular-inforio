import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({ declarations: [TestComponent], imports: [LazyRoutingModule], exports: [TestComponent] })
export class LazyModule {}
