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
