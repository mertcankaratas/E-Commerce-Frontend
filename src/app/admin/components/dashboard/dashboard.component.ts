import { AlertifyService, MessageType, Position } from './../../../services/admin/alertify.service';
import { HubUrls } from './../../../constants/hub-urls';
import { ReceiveFunctions } from './../../../constants/receive-functions';
import { SignalRService } from './../../../services/common/signalr.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopRight
      })
    });

  }


}
