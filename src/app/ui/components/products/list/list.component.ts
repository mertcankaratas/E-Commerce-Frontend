import { ListProduct } from './../../../../contracts/products/list-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: ListProduct[];
  constructor(private productService:ProductService) { }

  async ngOnInit()  {
    const data :{totalProductCount: Number,products:ListProduct[]} = await this.productService.read(0,12,
      ()=>{

    },
    errorMessage=>{

    });

    this.products = data.products;
  }

}
