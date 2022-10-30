import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { CreateProduct } from './../../../../contracts/products/create-product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService:ProductService, private alertify:AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement,stock: HTMLInputElement,price: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const createProduct:CreateProduct = new CreateProduct();
    createProduct.name=name.value;
    createProduct.stock=parseInt(stock.value);
    createProduct.price=parseFloat(price.value);

    this.productService.create(createProduct,()=>{
      this.hideSpinner(SpinnerType.BallAtom),
      this.alertify.message("ürün başarı ile eklenmiştir",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    },errorMessage=>{
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
    });
  }
}
