import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-policy-coupon',
  templateUrl: './policy-coupon.component.html',
  styleUrls: ['./policy-coupon.component.scss']
})
export class PolicyCouponComponent implements OnInit {
  premiumDetails: any = {}; personalDetails_session: any = {}; policyCoupon: any; policyCoupon_flag: boolean = false;
  policyCoupon_error_msg: string;

  constructor(public cs: CommonService, public activeRoute: ActivatedRoute, public router: Router) {
    this.premiumDetails = JSON.parse(sessionStorage.getItem('premiumDetails'));
    this.personalDetails_session = JSON.parse(sessionStorage.getItem('personalDetails'));

    let str = this.premiumDetails.model.includes(this.premiumDetails.manufacturer);
    if (str == true) {
      let substr = this.premiumDetails.model.split(this.premiumDetails.manufacturer);
      this.premiumDetails.model = substr[1];
    }
  }

  ngOnInit(): void {
  }

  validatePolicyCoupon() {
    if (this.policyCoupon != null && this.policyCoupon != undefined) {
      if (this.policyCoupon.length != 0) {
        console.info(this.policyCoupon.length)
        if (this.policyCoupon.length == 16) {
          this.cs.loader = true;
          this.cs.ValidateCoupon(JSON.stringify(this.policyCoupon)).then((res: any) => {
            if (res == true) {
              this.cs.loader = false;
              this.router.navigate(['policyConfirmation'])
            } else {
              this.cs.loader = false;
              swal({ text: 'We are facing some issue related with sysem. Sorry for inconvenience.', closeOnClickOutside: false });
            }
            this.policyCoupon_flag = false;
            this.cs.loader = false;
          },
            (err) => {
              this.cs.loader = false;
              this.policyCoupon_flag = false;
            });
        } else {
          this.policyCoupon_flag = true;
          this.cs.loader = false;
          this.policyCoupon_error_msg = 'In-valid policy key.'
        }
      } else {
        if (this.policyCoupon.length == 0) {
          this.policyCoupon_flag = true;
          this.policyCoupon_error_msg = 'enter policy key.'
        } else {
          this.policyCoupon_flag = false;
        }
      }
    } else {
      if (this.policyCoupon != null && this.policyCoupon != undefined) {
        if (this.policyCoupon.length != 0) {
          this.policyCoupon_flag = false;
        } else {
          this.policyCoupon_flag = true;
          this.policyCoupon_error_msg = 'enter policy key.'
        }
      } else {
        this.policyCoupon_flag = true;
        this.policyCoupon_error_msg = 'enter policy key.'
      }
    }
  }

}
