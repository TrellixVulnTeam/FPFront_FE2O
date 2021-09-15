import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit {

  premiumDetails: any = {}; personalDetails: any = {}; name_flag: boolean = false; City_State_flag: boolean = false;
  Address_flag: boolean = false; mobile_number_flag: boolean = false; email_flag: boolean = false; DOB_flag: boolean = false;
  pincode_flag: boolean = false; mobile_error_msg: string; pincode_error_msg: string; backup_DOB: any;

  constructor(public cs: CommonService, public activeRoute: ActivatedRoute, public router: Router) {
    this.premiumDetails = JSON.parse(sessionStorage.getItem('premiumDetails'));

    let str = this.premiumDetails.model.includes(this.premiumDetails.manufacturer);
    if (str == true) {
      let substr = this.premiumDetails.model.split(this.premiumDetails.manufacturer);
      this.premiumDetails.model = substr[1];
    }
  }

  ngOnInit() {
    this.personalDetails.WHATSAPP_UPDATE = true;
    this.personalDetails.terms_Conditions = false;
  }

  dateChanged(event: any) {
    console.info(event)
  }

  getVechilePremium() {
    console.info(this.personalDetails.DOB)
    let requestBody = {
      "NAME": this.personalDetails.NAME,
      "DOB": this.personalDetails.DOB,
      "MOBILE_NUMBER": this.personalDetails.MOBILE_NUMBER,
      "EMAIL": this.personalDetails.EMAIL,
      "ADDRESS": this.personalDetails.ADDRESS,
      "CITY_STATE": this.personalDetails.CITY_STATE,

      "WHATSAPP_UPDATE": this.personalDetails.WHATSAPP_UPDATE,

      "V_MAKE": this.premiumDetails.manufacturer,
      "V_MODEL": this.premiumDetails.model,
      "V_REGISTRATION": this.premiumDetails.registrationNumber,
      "V_REGDATE": this.premiumDetails.registrationDate,
      "AGENT_ID": '1018332'
    }

    if ((this.personalDetails.NAME != null && this.personalDetails.NAME != undefined) && (this.personalDetails.CITY_STATE != null && this.personalDetails.CITY_STATE != undefined) && (this.personalDetails.ADDRESS != null && this.personalDetails.ADDRESS != undefined) && (this.personalDetails.MOBILE_NUMBER != null && this.personalDetails.MOBILE_NUMBER != undefined) && (this.personalDetails.EMAIL != null && this.personalDetails.EMAIL != undefined) && (this.personalDetails.PINCODE != null && this.personalDetails.PINCODE != undefined) && (this.personalDetails.DOB != null && this.personalDetails.DOB != undefined)) {
      if (this.personalDetails.NAME.length != 0 && this.personalDetails.CITY_STATE.length != 0 && this.personalDetails.ADDRESS.length != 0 && this.personalDetails.MOBILE_NUMBER.length != 0 && this.personalDetails.EMAIL.length != 0 && this.personalDetails.PINCODE.length != 0 && this.personalDetails.DOB.length != 0) {
        if (this.personalDetails.terms_Conditions == false) {
          swal({ text: 'Please accept the Terms and Conditions', closeOnClickOutside: false });
        } else {
          const validEmail = this.cs.validateEmail(this.personalDetails.EMAIL);
          if (this.personalDetails.MOBILE_NUMBER.length == 10 && this.personalDetails.PINCODE.length == 6 && validEmail == true) {
            this.cs.loader = true;
            if (sessionStorage.getItem('call_ID')) {
              sessionStorage.removeItem('call_ID');
            }

            if (sessionStorage.getItem('personalDetails')) {
              sessionStorage.removeItem('personalDetails');
            }

            this.cs.CreateCall(JSON.stringify(requestBody)).then((res: any) => {
              let ID = {
                "call_ID": res.call_ID
              }
              sessionStorage.setItem('call_ID', JSON.stringify(ID));

              let personalDetails_session = {
                "NAME": this.personalDetails.NAME,
                "DOB": this.personalDetails.DOB,
                "MOBILE_NUMBER": this.personalDetails.MOBILE_NUMBER,
                "EMAIL": this.personalDetails.EMAIL,
              }
              sessionStorage.setItem('personalDetails', JSON.stringify(personalDetails_session));

              this.name_flag = false;
              this.City_State_flag = false;
              this.Address_flag = false;
              this.mobile_number_flag = false;
              this.email_flag = false;
              this.pincode_flag = false;
              this.DOB_flag = false;
              this.cs.loader = false;

              this.router.navigate(['previous-policy-details'])
            },
              (err) => {
                this.cs.loader = false;
              });
          } else {
            this.name_flag = false;
            this.City_State_flag = false;
            this.Address_flag = false;
            this.pincode_flag = false;
            this.email_flag = false;

            if (this.personalDetails.MOBILE_NUMBER.length != 10) {
              this.mobile_number_flag = true;
              this.mobile_error_msg = 'mobile number length cannot be less than 10.'
            } else {
              this.mobile_number_flag = false;
            }

            if (this.personalDetails.PINCODE.length < 6) {
              swal({ text: 'Pincode length cannot be less than 6.', closeOnClickOutside: false });
            }

            if (validEmail == false) {
              swal({ text: 'Please enter a valid email id.', closeOnClickOutside: false });
            }
          }
        }
      } else {
        if (this.personalDetails.NAME.length == 0) {
          this.name_flag = true;
        } else {
          this.name_flag = false;
        }

        if (this.personalDetails.CITY_STATE.length == 0) {
          this.City_State_flag = true;
        } else {
          this.City_State_flag = false;
        }

        if (this.personalDetails.ADDRESS.length == 0) {
          this.Address_flag = true;
        } else {
          this.Address_flag = false;
        }

        if (this.personalDetails.MOBILE_NUMBER.length == 0) {
          this.mobile_number_flag = true;
          this.mobile_error_msg = 'enter mobile number'
        } else {
          this.mobile_number_flag = false;
        }

        if (this.personalDetails.EMAIL.length == 0) {
          this.email_flag = true;
        } else {
          this.email_flag = false;
        }
      }

      if (this.personalDetails.PINCODE.length == 0) {
        this.pincode_flag = true;
        this.pincode_error_msg = 'enter pin code.'
      } else {
        this.pincode_flag = false;
      }

      if (this.personalDetails.DOB.length == 0) {
        this.DOB_flag = true;
      } else {
        this.DOB_flag = false;
      }

    } else {
      if (this.personalDetails.NAME != null && this.personalDetails.NAME != undefined) {
        if (this.personalDetails.NAME.length != 0) {
          this.name_flag = false;
        } else {
          this.name_flag = true;
        }
      } else {
        this.name_flag = true;
      }

      if (this.personalDetails.CITY_STATE != null && this.personalDetails.CITY_STATE != undefined) {
        if (this.personalDetails.CITY_STATE.length != 0) {
          this.City_State_flag = false;
        } else {
          this.City_State_flag = true;
        }
      } else {
        this.City_State_flag = true;
      }

      if (this.personalDetails.ADDRESS != null && this.personalDetails.ADDRESS != undefined) {
        if (this.personalDetails.ADDRESS.length != 0) {
          this.Address_flag = false;
        } else {
          this.Address_flag = true;
        }
      } else {
        this.Address_flag = true;
      }

      if (this.personalDetails.MOBILE_NUMBER != null && this.personalDetails.MOBILE_NUMBER != undefined) {
        if (this.personalDetails.MOBILE_NUMBER.length != 0) {
          this.mobile_number_flag = false;
        } else {
          this.mobile_number_flag = true;
          this.mobile_error_msg = 'enter mobile number'
        }
      } else {
        this.mobile_number_flag = true;
        this.mobile_error_msg = 'enter mobile number'
      }

      if (this.personalDetails.EMAIL != null && this.personalDetails.EMAIL != undefined) {
        if (this.personalDetails.EMAIL.length != 0) {
          this.email_flag = false;
        } else {
          this.email_flag = true;
        }
      } else {
        this.email_flag = true;
      }

      if (this.personalDetails.PINCODE != null && this.personalDetails.PINCODE != undefined) {
        if (this.personalDetails.PINCODE.length != 0) {
          this.pincode_flag = false;
        } else {
          this.pincode_flag = true;
          this.pincode_error_msg = 'enter pin code.'
        }
      } else {
        this.pincode_flag = true;
        this.pincode_error_msg = 'enter pin code.'
      }

      if (this.personalDetails.DOB != null && this.personalDetails.DOB != undefined) {
        if (this.personalDetails.DOB.length != 0) {
          this.DOB_flag = false;
        } else {
          this.DOB_flag = true;
        }
      } else {
        this.DOB_flag = true;
      }
    }
  }
}
