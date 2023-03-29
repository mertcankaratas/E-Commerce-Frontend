import { ListBasketItem } from './../../../contracts/basket/list-basket-item';
import { BasketService } from './../../../services/common/models/basket.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner :NgxSpinnerService,private basketService:BasketService) {
    super(spinner)
   }

  basketItems: ListBasketItem[];

   async ngOnInit(): Promise<void> {

    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
  }

}
