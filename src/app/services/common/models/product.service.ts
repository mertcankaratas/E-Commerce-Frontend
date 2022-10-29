import { CreateProduct } from '../../../contracts/products/create-product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:any){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result=>{
      successCallBack();
        alert("başarılı")
    });
  }
}
