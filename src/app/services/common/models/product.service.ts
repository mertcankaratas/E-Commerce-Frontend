import { CreateProduct } from '../../../contracts/products/create-product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:any,errorCallBack?:any){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result=>{
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      const _error: Array<{key:string, value:Array<string>}> = errorResponse.error;
      let message="";
      _error.forEach((v,index)=>{
        v.value.forEach((_v,_index)=>{
          message +=`${_v}<br>`;
        });
      });

      errorCallBack(message);
    });

  }
}
