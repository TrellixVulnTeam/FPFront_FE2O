import { APP_BASE_HREF } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonData } from 'src/app/common/commonData';
import { CommonService } from 'src/app/service/common.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: ElementRef;
  shortLink: any;
  id: any;
  file1: File;
  agentId: any;
  fileSelect = false;
  isUploadClick = false;
  fileUploadRes: any;
  file = {
    name: 'Browse File',
  };
  fileUploadSuccess: any;
  validFile = false;
  constructor(
    public cs: CommonService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getParams();
    this.getToken();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.file1 = event.target.files[0];
    this.fileSelect = true;
    console.log('File', this.file);
    let validateFile = /^[a-z0-9\s_.@()-]+\.[^.]+$/i.test(this.file1.name);
    let abc =
      this.file1.name.includes('.xlsx') || this.file1.name.includes('.xls');
    let pqr =
      this.file1.name.includes('.exe') ||
      this.file1.name.includes('.EXE') ||
      this.file1.name.includes('.jpg') ||
      this.file1.name.includes('.JPG') ||
      this.file1.name.includes('.jpeg') ||
      this.file1.name.includes('.JPEG');

    if (validateFile && abc && !pqr) {
      this.validFile = true;
    } else {
      this.validFile = false;
      let fileName = document.getElementById(
        'customFileInput'
      ) as HTMLInputElement;
      fileName.value = '';
      // this.myInputVariable.nativeElement.value = '';
      // swal({
      //   text: 'Invalid file format',
      //   closeOnClickOutside: false,
      // });
    }
  }

  // getParams() {
  //   return new Promise((resolve: any) => {
  //     this.activeRoute.queryParams.forEach((params: any) => {
  //       console.log(params);
  //       this.cs.loader = true;
  //       this.agentId = params.agentId;
  //       console.log(this.agentId);
  //       let data = this.cs.decryptLikePython(this.agentId);
  //       let data1 = data.split('&');
  //       let data2 = data1[1];
  //       this.cs.agentID = data1[0];
  //       var timeDiff = Math.abs(Date.now() - new Date(data2).getTime());
  //       let min = Math.round((timeDiff / (1000 * 60)) % 60);
  //       console.log(data, data1, data2, this.cs.agentID, min);
  //       // if (
  //       //   this.cs.isUndefineORNull(this.cs.agentID) ||
  //       //   this.cs.isUndefineORNull(data1) ||
  //       //   this.cs.isUndefineORNull(min)
  //       // ) {
  //       //     location.href = CommonData.loginUrl;
  //       //   this.cs.loader = false;
  //       // } else {
  //       // if (min < 15) {
  //       //   localStorage.setItem('agentID', this.agentId);
  //       //   this.cs.loader = false;
  //       // } else {
  //       //   location.href = CommonData.loginUrl;
  //       //   this.cs.loader = false;
  //       // }
  //       // }
  //     });
  //   });
  // }

  getToken(): Promise<any> {
    return new Promise((resolve: any) => {
      let body = {
        username: '7yjF6fVFyRg=',
        password: 'VYxkVlge5rq0WHkO7bucmQ==',
      };

      let str = JSON.stringify(body);
      this.cs.loader = true;
      this.cs
        .postWithoutAuth('api/v1/token', str)
        .then((res: any) => {
          console.log(res);
          localStorage.setItem('AuthToken', JSON.stringify(res));
          this.cs.loader = false;
          resolve();
        })
        .catch((err: any) => {
          this.cs.loader = false;
          console.log(err);
        });
    });
  }

  downloadSample() {
    this.cs.getExcel();
  }

  uploadDoc() {
    console.log(this.file);
    this.isUploadClick = true;
    this.cs.loader = true;
    if (this.cs.isUndefineORNull(this.file1)) {
      swal({
        text: 'Please select file before upload',
        closeOnClickOutside: false,
      });
      this.cs.loader = false;
    } else {
      if (!this.validFile) {
      } else {        
        this.cs.postWithFormData('uploadFile', this.file1).then((res: any) => {
          console.log(res);
          if (res.status != 'success') {
            this.fileUploadRes = res;
            this.fileUploadSuccess = false;
            this.cs.loader = false;
          } else {
            this.fileUploadSuccess = true;
            this.fileUploadRes = '';
            this.shortLink = true;
            this.cs.loader = false;
          }
        });
      }
    }
  }

  redirectToDash() {
    this.router.navigateByUrl('UploadDashbord');
  }
}
