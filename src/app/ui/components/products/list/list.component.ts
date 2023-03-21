import { BaseUrl } from './../../../../contracts/products/base-url';
import { FileService } from './../../../../services/common/models/file.service';
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
  baseUrl: BaseUrl;
  products: ListProduct[];
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService) { }

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: { totalProductCount: number, products: ListProduct[] } = await this.productService.read(this.currentPageNo - 1, 12,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;


      this.products = this.products.map(p => {
        const listProduct: ListProduct = {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          productImageFiles:p.productImageFiles
        }
        return listProduct;
      });


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
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
      }
    });


  }

}
