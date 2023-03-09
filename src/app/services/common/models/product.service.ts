import { ListProductImage } from './../../../contracts/products/list-product-image';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from './../../../contracts/products/list-product';
import { CreateProduct } from '../../../contracts/products/create-product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });

      errorCallBack(message);
    });

  }


  async read(page: number = 0, size: number = 5, successCallback?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: ListProduct[] }> {
    const promiseData: Promise<{ totalProductCount: number; products: ListProduct[] }> = this.httpClientService.get<{ totalProductCount: number; products: ListProduct[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`

    }).toPromise();

    promiseData.then(d => successCallback())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallback?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages",
      controller: "products"
    }, id);

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCallback();

    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`,
    }, id);

    await firstValueFrom(deleteObservable);
    successCallBack();
  }


  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void):Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.put({
      controller:"products",
      action:"ChangeShowcaseImage",
      queryString:`imageId=${imageId}&productId=${productId}`
    },{});

    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();


  }
}
