import { HttpClientService } from './../../../services/common/http-client.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner :NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService.get<Product[]>({
      controller:"products"
    }).subscribe(data=>console.log(data));

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller:"products"
    // },{
    //     id:"21aae0d0-6218-40d9-871b-ac2e8caa8084",
    //     name:"Renkli Kağıt",
    //     stock:1500,
    //     price:5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller:"products"
    // },"44c25119-c5a4-49bb-99ac-ddf951ceabb2").subscribe();


    // this.httpClientService.get({
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=>console.log(data));
  }



}
