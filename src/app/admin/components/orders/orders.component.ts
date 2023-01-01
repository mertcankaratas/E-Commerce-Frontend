import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent implements OnInit {

  constructor(spinner :NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
    //this.showSpinner(SpinnerType.BallAtom);

  }

}
