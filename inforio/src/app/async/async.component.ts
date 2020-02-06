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

  busy = false;

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit() {}

  read() {
    const barcodeModalRef = this.modalService.open(BarcodeComponent);
    const barcodeComponent: BarcodeComponent = barcodeModalRef.componentInstance;
    barcodeComponent.callback = (barcode: string) => {
      if (barcode != null) {
        this.busy = true;
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
                        this.busy = true;
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
                            },
                            () => (this.busy = false)
                          );
                      }
                    };
                  } else if (amount > 0) {
                    console.log('amount:', amount);
                    this.busy = true;
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
                        },
                        () => (this.busy = false)
                      );
                  }
                };
              }
            };
          },
          error => {
            this.barcodeRequestError = true;
            setTimeout(_ => (this.barcodeRequestError = false), 5000);
          },
          () => (this.busy = false)
        );
      }
    };
  }
}
