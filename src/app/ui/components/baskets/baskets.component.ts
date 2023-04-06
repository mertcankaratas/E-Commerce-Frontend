import { UpdateBasketItem } from './../../../contracts/basket/update-basket-item';
import { ListBasketItem } from './../../../contracts/basket/list-basket-item';
import { BasketService } from './../../../services/common/models/basket.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

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


  changeQuantity(object:any){
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId:string = object.target.attributes["id"].value;
    console.log(basketItemId);
    const quantity:number = object.target.value;
    const basketItem : UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId=basketItemId;
    basketItem.quantity = quantity;
    this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
  }


 async removeBasketItem(basketItemId:string){
      this.showSpinner(SpinnerType.BallAtom);

      await this.basketService.remove(basketItemId);

      $("."+basketItemId).fadeOut(500,()=> this.hideSpinner(SpinnerType.BallAtom));




  }

}
