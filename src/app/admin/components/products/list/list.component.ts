import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../services/common/dialog.service';
import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProduct } from './../../../../contracts/products/list-product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService ,private productService:ProductService,private alertifyService:AlertifyService,private dialogService:DialogService) {
    super(spinner);
   }

  displayedColumns: string[] = ['name', 'stock','price', 'createdDate','updatedDate','photos','edit','delete'];
  dataSource:MatTableDataSource<ListProduct>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
      const allProducts:{totalCount:number;products: ListProduct[]} = await this.productService.read(this.paginator? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize :5,()=>this.hideSpinner(SpinnerType.BallAtom),errorMessage=>this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      }))

      this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
      this.paginator.length = allProducts.totalCount;

  }

  addProductImages(id:string){
      this.dialogService.openDialog({
        componentType:SelectProductImageDialogComponent,
        data:id,
        options:{
          width:"1400px",
        }
      });
  }

  async pageChanged(){
    await this.getProducts();
  }
  async ngOnInit() {
      await this.getProducts();
  }

}
