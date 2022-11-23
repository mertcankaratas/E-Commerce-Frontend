import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(dialogRef :MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :SelectProductImageState | string)
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


}
  export enum SelectProductImageState{
    Close
  }
