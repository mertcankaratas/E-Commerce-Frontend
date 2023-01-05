import { AuthService } from './../../../services/common/auth.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService,spinner:NgxSpinnerService,private authService:AuthService,private activatedRoute:ActivatedRoute,private router:Router,private socialAuthService:SocialAuthService ) {
    super(spinner);
    socialAuthService.authState.subscribe((user: SocialUser)=>{
      console.log(user);
    })
   }

  ngOnInit(): void {
  }

 async login(userNameOrEmail:string,password:string){
  this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(userNameOrEmail,password,()=>{
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params=>{
       const returnUrl:string= params["returnUrl"];
       if(returnUrl){
          this.router.navigate([returnUrl])
       }
      });
      this.hideSpinner(SpinnerType.BallAtom)});


  }

}
