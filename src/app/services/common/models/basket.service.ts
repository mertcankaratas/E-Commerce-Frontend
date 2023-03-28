import { UpdateBasketItem } from './../../../contracts/basket/update-basket-item';
import { CreateBasketItem } from './../../../contracts/basket/create-basket-item';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }


async get():Promise<ListBasketItem[]>{
  const observable : Observable<ListBasketItem[]> = this.httpClientService.get({
    controller:"baskets"
  });

 return await firstValueFrom(observable)
}

async add(basketItem:CreateBasketItem):Promise<any>{
  const observable:Observable<any> = this.httpClientService.post({
    controller:"baskets"
  },basketItem);

  await firstValueFrom(observable);
}


async put(basketItem:UpdateBasketItem):Promise<void>{
  const observable:Observable<any> = this.httpClientService.put({
    controller:"baskets",
  },basketItem);
  await firstValueFrom(observable);
}


async remove(basketItemId:string){
  const observable:Observable<any> = this.httpClientService.delete({
    controller:"baskets"
  },basketItemId);


  await  firstValueFrom(observable);
}

}
