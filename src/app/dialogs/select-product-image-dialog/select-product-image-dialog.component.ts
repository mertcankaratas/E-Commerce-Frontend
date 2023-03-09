import { async } from 'rxjs';
import { DeleteDialogComponent, DeleteState } from './../delete-dialog/delete-dialog.component';
import { DialogService } from './../../services/common/dialog.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../services/common/models/product.service';
import { ListProductImage } from './../../contracts/products/list-product-image';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { MatCard } from '@angular/material/card';
import { stringify } from 'querystring';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef :MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService)
  {
    super(dialogRef)
  }



 @Output() options:Partial<FileUploadOptions>={
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Ürün seçmini seçin veya buraya sürükleyin",
    isAdminPage:true,
    queryString:`id=${this.data}`
  };


  images:ListProductImage[];
 async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string,()=> this.spinner.hide(SpinnerType.BallAtom));
  }

 async deleteImage(imageId:string,event:any){

    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async()=>{
        this.spinner.show(SpinnerType.BallAtom);
    await  this.productService.deleteImage(this.data as string,imageId,()=>{
    this.spinner.hide(SpinnerType.BallAtom);
    var card = $(event.srcElement).parent().parent();

    card.fadeOut(500);
    });

      }
    });


  }


  showCase(imageId:string){
    alert("image id : " + imageId + "- Product Id : " + this.data );
  }

}
  export enum SelectProductImageState{
    Close
  }
