import { async } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListProduct } from './../../../../contracts/products/list-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  currentPageNo:number;
  products: ListProduct[];
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { }

  ngOnInit()  {
    this.activatedRoute.params.subscribe(async params=>{

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data :{totalProductCount: Number,products:ListProduct[]} = await this.productService.read(this.currentPageNo-1,12,
        ()=>{

      },
      errorMessage=>{

      });

      this.products = data.products;
    });


  }

}
