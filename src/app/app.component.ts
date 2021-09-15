import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { CommonData } from './common/commonData';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'ICICI Lombard';
  currentUrl:any;

  constructor(public cs: CommonService, public router: Router){

  }

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        console.log(event.url);
        this.currentUrl = event.url;
        console.log(this.currentUrl.includes("quote"), this.currentUrl.includes("proposal"), this.currentUrl.includes("paymentConfirmation"));   
        if(this.currentUrl.includes("quote") || this.currentUrl.includes("proposal") || this.currentUrl.includes("paymentConfirmation")){
          this.cs.showLogout = false;
        }else{
          this.cs.showLogout = true;
        }        
      }
    });
  }

  goToNysa(){
    location.href = CommonData.loginUrl
  }
  
}
