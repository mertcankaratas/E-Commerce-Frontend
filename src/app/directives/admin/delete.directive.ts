import { HttpErrorResponse } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from './../../services/admin/alertify.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { DeleteDialogComponent, DeleteState } from './../../dialogs/delete-dialog/delete-dialog.component';
import { SpinnerType } from './../../base/base.component';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,
    private _renderer:Renderer2,
    private httpCLientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService)
    {
      const img =_renderer.createElement("img");
      img.setAttribute("src","./../../../../../assets/delete.png");
      img.setAttribute("style","cursor: pointer");
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img);

    }

    @Input() id:string;
    @Input() controller:string;
    @Output() callback:EventEmitter<any>=new EventEmitter;
    @HostListener("click")
   async  onClick(){
      this.openDialog(async()=>{
        this.spinner.show(SpinnerType.BallAtom);
        const td:HTMLTableCellElement=this.element.nativeElement;

        this.httpCLientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).animate({
            opacity:0,
            left:"+=50",
            height:"toogle"
          },700,()=>{
            this.callback.emit();
            this.alertifyService.message("Ürün Başarı ile silinmiştir.",{
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.TopRight
            });
          });

        },(errorResponse:HttpErrorResponse)=>{
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertifyService.message("Ürün silinirken beklenmeyen bir  hata ile karşılaşılmıştır",{
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          });
        });

      });

    }


    openDialog(afterClosed:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data:DeleteState.Yes,
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result==DeleteState.Yes){
          afterClosed();
        }
      });
    }
  }


