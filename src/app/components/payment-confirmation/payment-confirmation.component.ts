import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {

  transactionID: any; premiumAmount = '17396'; previousData: any;

  constructor(public cs: CommonService) { }

  ngOnInit(){
    this.transactionID = localStorage.getItem('transactionID');
    this.previousData = JSON.parse(localStorage.getItem('previousData'));
    this.premiumAmount = this.previousData.Amount;
    console.log(this.transactionID);
    this.cs.loader = false;
  }

}
