import { ListProduct } from './../../../contracts/products/list-product';
import { CreateProduct } from '../../../contracts/products/create-product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void){
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


 async read(page:number =0,size:number=5,successCallback?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;products: ListProduct[]}>{
   const promiseData: Promise<{totalCount:number;products: ListProduct[]}>= this.httpClientService.get<{totalCount:number;products: ListProduct[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`

    }).toPromise();

    promiseData.then(d=>successCallback())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }
}
