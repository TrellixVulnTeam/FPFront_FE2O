import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';
@Component({
  selector: 'app-previous-policy-details',
  templateUrl: './previous-policy-details.component.html',
  styleUrls: ['./previous-policy-details.component.scss']
})
export class PreviousPolicyDetailsComponent implements OnInit {

  premiumDetails: any = {}; personalDetails_session: any = {}; previousPolicyDetails: any = {};
  PP_NCB_flag: boolean; PP_ENDDATE_flag: boolean; toggleHTMLElements: boolean = false;

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
    this.previousPolicyDetails.NCB = false;
    this.previousPolicyDetails.PP_CLAIMMADE = false;
    this.previousPolicyDetails.NCB_DECLARATION = true;
    this.previousPolicyDetails.IS_NCBD = true;
    this.previousPolicyDetails.HYPOTHECATION_DETAILS = 'None'
  }


  radioButtonToggle(event: any) {
    this.previousPolicyDetails.PP_CLAIMMADE = event;
  }

  SavePreviousPolicy() {
    if ((this.previousPolicyDetails.PP_ENDDATE != null && this.previousPolicyDetails.PP_ENDDATE != undefined) && (this.previousPolicyDetails.PP_NCB != null && this.previousPolicyDetails.PP_NCB != undefined)) {
      if (this.previousPolicyDetails.PP_NCB.length != 0 && this.previousPolicyDetails.PP_ENDDATE.length != 0) {
        this.PP_NCB_flag = false;
        this.PP_ENDDATE_flag = false;
        this.toggleHTMLElements = true;
      } else {
        if (this.previousPolicyDetails.PP_ENDDATE.length == 0) {
          this.PP_ENDDATE_flag = true;
        } else {
          this.PP_ENDDATE_flag = false;
        }

        if (this.previousPolicyDetails.PP_NCB.length == 0) {
          this.PP_NCB_flag = true;
        } else {
          this.PP_NCB_flag = false;
        }
      }
    } else {
      if ((this.previousPolicyDetails.PP_ENDDATE != null && this.previousPolicyDetails.PP_ENDDATE != undefined)) {
        if (this.previousPolicyDetails.PP_ENDDATE.length != 0) {
          this.PP_ENDDATE_flag = false;
        } else {
          this.PP_ENDDATE_flag = true;
        }
      } else {
        this.PP_ENDDATE_flag = true;
      }

      if (this.previousPolicyDetails.PP_NCB != null && this.previousPolicyDetails.PP_NCB != undefined) {
        if (this.previousPolicyDetails.PP_NCB.length != 0) {
          this.PP_NCB_flag = false;
        } else {
          this.PP_NCB_flag = true;
        }
      } else {
        this.PP_NCB_flag = true;
      }
    }
  }

  hypothecationDetailsRadioBtn(event: any) {
    console.info(event)
    this.previousPolicyDetails.HYPOTHECATION_DETAILS = event
  }

  GetPreviousPolicyDetails() {
    let PreviousPolicyDetailsSession = {
      "PP_ENDDATE": this.previousPolicyDetails.PP_ENDDATE,
      "PP_CLAIMMADE": this.previousPolicyDetails.PP_CLAIMMADE,
      "PP_NCB": this.previousPolicyDetails.PP_NCB,
      "IS_NCBD": this.previousPolicyDetails.IS_NCBD,
      "HYPOTHECATION_DETAILS": this.previousPolicyDetails.HYPOTHECATION_DETAILS
    }
    this.cs.loader = true;
    this.cs.SendPreviousPolicy(JSON.stringify(PreviousPolicyDetailsSession)).then((res: any) => {
      console.info(JSON.stringify(res))
      if (res.error == false) {
        this.cs.loader = false;
        this.router.navigate(['policy-coupon-details'])
      } else {
        this.cs.loader = false;
        swal({ text: 'We are facing some issue related with sysem. Sorry for inconvenience.', closeOnClickOutside: false });
      }
    },
      (err) => {
        this.cs.loader = false;
        swal({ text: 'We are facing some issue related with sysem. Sorry for inconvenience.', closeOnClickOutside: false });
      });
  }
}
