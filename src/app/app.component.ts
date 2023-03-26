import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router,httpClientService:HttpClientService) {

    httpClientService.put({
      controller:"baskets"
    },{
      basketItemId:"1e6c5206-372f-4dac-87f2-ba7c5b46e87e",
      quantity:"4"
    }).subscribe(data=>{
      debugger;
    });

    authService.identityCheck();
  }


  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum başarı ile kapatılmıştır.","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
}


