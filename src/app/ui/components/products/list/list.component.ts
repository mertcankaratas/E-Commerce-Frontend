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

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];

  products: ListProduct[];
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: { totalProductCount: number, products: ListProduct[] } = await this.productService.read(this.currentPageNo - 1, 12,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];
      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      }
      else if (this.currentPageNo + 3 >= this.totalPageCount) {

        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }

      }

      else {
        for (let i = this.currentPageNo-3; i <= this.currentPageNo+3; i++) {
          this.pageList.push(i);
        }
      }
    });


  }

}
