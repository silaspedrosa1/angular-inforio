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
