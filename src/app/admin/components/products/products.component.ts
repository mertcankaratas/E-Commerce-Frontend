import { ListComponent } from './list/list.component';
import { CreateProduct } from './../../../contracts/products/create-product';
import { HttpClientService } from './../../../services/common/http-client.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


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


  }

   @ViewChild(ListComponent) listComponents :ListComponent;
  createdProduct(createdProduct:CreateProduct): void{
    this.listComponents.getProducts();
  }

}
