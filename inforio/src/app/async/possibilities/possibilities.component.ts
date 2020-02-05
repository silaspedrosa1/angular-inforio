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
