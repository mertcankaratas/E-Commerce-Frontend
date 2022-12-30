import { TokenResponse } from './../../../contracts/Token/token-response';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { Token } from './../../../contracts/Token/token';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateUser } from './../../../contracts/users/create-user';
import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

 async create(user:User):Promise<CreateUser>{
   const observable:Observable<CreateUser | User> =  this.httpClientService.post<CreateUser | User>({
      controller:"users",
    },user);

    return await firstValueFrom(observable) as CreateUser ;
  }

 async login(userNameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
   const observable: Observable<any | TokenResponse>= this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action:"login"
    },{userNameOrEmail,password});

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }
}
