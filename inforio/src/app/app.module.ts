import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AsyncComponent } from './async/async.component';
import { fakeBackendProvider } from './data/interceptors/backend.interceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PossibilitiesComponent } from './async/possibilities/possibilities.component';
import { HttpClientModule } from '@angular/common/http';
import { AmountComponent } from './async/amount/amount.component';
import { ConfirmationComponent } from './async/confirmation/confirmation.component';
import { BarcodeComponent } from './async/barcode/barcode.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsyncComponent,
    PossibilitiesComponent,
    AmountComponent,
    ConfirmationComponent,
    BarcodeComponent,
    SpinnerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, FormsModule],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent],
  entryComponents: [PossibilitiesComponent, BarcodeComponent, AmountComponent, ConfirmationComponent]
})
export class AppModule {}
