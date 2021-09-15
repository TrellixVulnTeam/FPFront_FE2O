import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  vechileDetails: any = {}; vechileManufacturer: any = []; manufacturerModals: any = []; selectedManufacturerModals: any = [];
  registrationNumberFlag: boolean; chassisNumberFlag: boolean; engineNumberFlag: boolean; rtoFlag: boolean;
  VechileDetailStatus: boolean = false; submit_btn_disabled: boolean = true; registrationDateFlag: boolean = false;

  constructor(public cs: CommonService, public router: Router, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let date = new Date()
    this.vechileDetails.registrationDate = this.cs.formatDate_v2(date);
  }

  getVechileDetails(event: any) {
    let regNo;
    if (this.vechileDetails.registrationNumber.length >= 9) {
      this.cs.loader = true;
      sessionStorage.removeItem('premiumDetails');

      this.cs.getWheelInfo(JSON.stringify(event)).then((res: any) => {
        if (this.cs.isUndefineORNull(res)) {
          swal({ text: 'We are facing some issue related with sysem. Sorry for inconvenience.', closeOnClickOutside: false });
        } else {
          regNo = this.vechileDetails.registrationNumber;
          this.vechileDetails.registrationDate = '';
          this.cs.loader = false;
          this.VechileDetailStatus = res.error;
          this.submit_btn_disabled = false;
          if (res.error == false) {
            this.vechileDetails = res;
            let date = new Date(res.registrationDate)
            this.vechileDetails.registrationDate = this.cs.formatDate_v2(date)
            this.vechileManufacturer.push(res.manufacturer);
            this.selectedManufacturerModals.push(res.model);
            let premiumDetails = {
              "registrationNumber": res.registrationNumber,
              "manufacturer": res.manufacturer,
              "model": res.model,
              "registrationDate": res.registrationDate,
              "ncb": res.premiumDetails.ncb,
              "vehicleAge": res.premiumDetails.vehicleAge,
              "hasRSA": res.premiumDetails.hasRSA,
              "fixedIDV": res.premiumDetails.fixedIDV,
              "status": res.error
            }
            sessionStorage.setItem('premiumDetails', JSON.stringify(premiumDetails));
          } else {
            this.vechileDetails = {};

            this.vechileDetails.registrationNumber = regNo;

            // let date = new Date();
            // this.vechileDetails.registrationDate = this.cs.formatDate(date);
            this.getMakenModelDetails();
          }
        }
      },
        (err) => {
          this.cs.loader = false;
        });
    }
  }

  getMakenModelDetails() {
    this.vechileManufacturer = [];
    this.selectedManufacturerModals = [];
    this.cs.getMakenModel().then((res: any) => {
      if (this.cs.isUndefineORNull(res)) {
        swal({ text: 'We are facing some issue related with sysem. Sorry for inconvenience.', closeOnClickOutside: false });
      } else {
        this.manufacturerModals = res;
        this.vechileManufacturer = Object.keys(res);
        this.selectedManufacturerModals = this.manufacturerModals[this.vechileManufacturer[0]];
        this.vechileDetails.manufacturer = this.vechileManufacturer[0];
        this.vechileDetails.model = this.selectedManufacturerModals[0];
      }
    },
      (err) => {
        this.cs.loader = false;
      });
  }


  getVechilePremium() {
    this.cs.loader = true;
    let requestBody = {
      "registrationNumber": this.vechileDetails.registrationNumber,
      "rto": this.vechileDetails.rto,
      "registrationDate": this.vechileDetails.registrationDate,
      "manufacturer": this.vechileDetails.manufacturer,
      "model": this.vechileDetails.model,
      "engineNumber": this.vechileDetails.engineNumber,
      "chassisNumber": this.vechileDetails.chassisNumber,
      "hasRSA": false
    }

    if (this.VechileDetailStatus == true) {
      if ((this.vechileDetails.registrationNumber != null && this.vechileDetails.registrationNumber != undefined) && (this.vechileDetails.rto != null && this.vechileDetails.rto != undefined) && (this.vechileDetails.engineNumber != null && this.vechileDetails.engineNumber != undefined) && (this.vechileDetails.chassisNumber != null && this.vechileDetails.chassisNumber != undefined) && (this.vechileDetails.registrationDate != null && this.vechileDetails.registrationDate != undefined)) {
        if (this.vechileDetails.registrationNumber.length != 0 && this.vechileDetails.rto.length != 0 && this.vechileDetails.engineNumber.length != 0 && this.vechileDetails.chassisNumber.length != 0 && this.vechileDetails.registrationDate.length != 0) {
          this.cs.loader = true;
          this.cs.getPremium(JSON.stringify(requestBody)).then((res: any) => {
            let premiumDetails = {
              "registrationNumber": this.vechileDetails.registrationNumber,
              "manufacturer": this.vechileDetails.manufacturer,
              "model": this.vechileDetails.model,
              "registrationDate": this.vechileDetails.registrationDate,
              "ncb": res.ncb,
              "vehicleAge": res.vehicleAge,
              "hasRSA": res.hasRSA,
              "fixedIDV": res.fixedIDV,
              "status": this.VechileDetailStatus
            }
            this.cs.loader = false;
            sessionStorage.setItem('premiumDetails', JSON.stringify(premiumDetails));
            this.registrationNumberFlag = false;
            this.rtoFlag = false;
            this.engineNumberFlag = false;
            this.chassisNumberFlag = false;
            this.registrationDateFlag = false;
            this.router.navigate(['proposal'])
          },
            (err) => {
              this.cs.loader = false;
              this.registrationNumberFlag = false;
              this.rtoFlag = false;
              this.engineNumberFlag = false;
              this.chassisNumberFlag = false;
              this.registrationDateFlag = false;
            });
        } else {
          this.cs.loader = false;
          if (this.vechileDetails.registrationNumber.length == 0) {
            this.registrationNumberFlag = true;
          } else {
            this.registrationNumberFlag = false;
          }
          if (this.vechileDetails.rto.length == 0) {
            this.rtoFlag = true;
          } else {
            this.rtoFlag = false;
          }
          if (this.vechileDetails.engineNumber.length == 0) {
            this.engineNumberFlag = true;
          } else {
            this.engineNumberFlag = false;
          }
          if (this.vechileDetails.chassisNumber.length == 0) {
            this.chassisNumberFlag = true;
          } else {
            this.chassisNumberFlag = false;
          }
          if (this.vechileDetails.registrationDate.length == 0) {
            this.registrationDateFlag = true;
          } else {
            this.registrationDateFlag = false;
          }
        }
      } else {
        this.cs.loader = false;
        if (this.vechileDetails.registrationNumber != null && this.vechileDetails.registrationNumber != undefined) {
          if (this.vechileDetails.registrationNumber.length != 0) {
            this.registrationNumberFlag = false;
          } else {
            this.registrationNumberFlag = true;
          }
        } else {
          this.registrationNumberFlag = true;
        }

        if (this.vechileDetails.rto != null && this.vechileDetails.rto != undefined) {
          if (this.vechileDetails.rto.length != 0) {
            this.rtoFlag = false;
          } else {
            this.rtoFlag = true;
          }
        } else {
          this.rtoFlag = true;
        }

        if (this.vechileDetails.engineNumber != null && this.vechileDetails.engineNumber != undefined) {
          if (this.vechileDetails.engineNumber.length != 0) {
            this.engineNumberFlag = false;
          } else {
            this.engineNumberFlag = true;
          }
        } else {
          this.engineNumberFlag = true;
        }

        if (this.vechileDetails.chassisNumber != null && this.vechileDetails.chassisNumber != undefined) {
          if (this.vechileDetails.chassisNumber.length != 0) {
            this.chassisNumberFlag = false;
          } else {
            this.chassisNumberFlag = true;
          }
        } else {
          this.chassisNumberFlag = true;
        }
        if (this.vechileDetails.registrationDate != null && this.vechileDetails.registrationDate != undefined) {
          if (this.vechileDetails.registrationDate.length != 0) {
            this.registrationDateFlag = false;
          } else {
            this.registrationDateFlag = true;
          }
        } else {
          this.registrationDateFlag = true;
        }
      }
    } else {
      this.cs.loader = false;
      this.router.navigate(['proposal'])
    }
  }

  onChange(val: any) {
    this.selectedManufacturerModals = [];
    this.selectedManufacturerModals = this.manufacturerModals[val];
  }
}
