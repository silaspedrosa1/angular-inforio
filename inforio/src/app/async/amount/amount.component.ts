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
