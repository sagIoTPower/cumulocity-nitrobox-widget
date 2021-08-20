// FIXME move to separate component
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalLabels } from '@c8y/ngx-components';
import { Option } from './nx-plans-widget.component'
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'options-dialog',
  template: `
  <div class="modal-header dialog-header">
  <i class="c8y-icon"></i>
  <h4 translate>Product Details for plan {{plan}}</h4>
  </div>
  <div class="modal-body dialog-body">
          <table class="table table-condensed table-striped table-vertical-middle table-fixed">
          <thead class="headers table-header-sticky">
              <tr>
              <th style="min-width: 140px!important; top: 36px; z-index: 12;">
                  <div translate="" class="header-cell">Name</div>
              </th>
              <th style="min-width: 140px!important; top: 36px; z-index: 12;">
                  <div translate="" class="header-cell">Price</div>
              </th>
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let option of options">
              <td class="text-left">{{option.name}}</td>
              <td class="text-right">{{(option.itemPriceNet | number : '1.2-2') + " " + option.currency}}</td>
              </tr>
          </tbody>
          </table>
  </div>
  <div class="modal-footer">
    <button
      class="btn btn-default"
      translate
      type="button"
      title="{{ 'Close' | translate }}"
      (click)="onClose($event)"
    >
      Close
    </button>
  </div>`
})
export class NxPlansOptionComponent {
  options: Option[]
  plan: string
  constructor(
    private bsModalRef: BsModalRef,
  ) { }
  closeSubject: Subject<boolean> = new Subject();

  onDismiss(event){
    this.closeSubject.next(false);
  }

  onClose(event) {
    console.log("Closing")
    this.closeSubject.next(true);
    this.bsModalRef.hide();
  }
}