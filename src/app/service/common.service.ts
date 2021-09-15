import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonData } from '../common/commonData';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';


declare var require: any;
var b64toBlob = require('b64-to-blob');
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // crypto
  keySize = 256;
  ivSize = 128;
  saltSize = 256;
  iterations = 1000;
  agentID: any;
  AuthToken: any;
  loader = false;
  showLogout = true;
  constructor(public http: HttpClient, private router: Router) { }

  postWithoutAuth(endPoint: any, body: any) {
    // this.AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
    let headers = new HttpHeaders();
    // headers = headers.append("Authorization", "Bearer " + this.AuthToken.access);
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .post(CommonData.baseURL + endPoint, body, { headers: headers })
      .toPromise();
  }

  post(endPoint: any, body: any) {
    this.AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.AuthToken.access
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .post(CommonData.baseURL + endPoint, body, { headers: headers })
      .toPromise();
  }

  get(endPoint: any) {
    this.AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.AuthToken.access
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .get(CommonData.baseURL + endPoint, { headers: headers })
      .toPromise();
  }

  get1(endPoint: any) {
    this.AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
    let headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.AuthToken.access
    );
    // headers = headers.append('Content-Type', 'text');
    return this.http
      .get(CommonData.baseURL + endPoint, { headers: headers })
      .toPromise();
  }

  getPayToken() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('UserName', 'bmN6k8FUGBg0QvReJvVHow==');
    headers = headers.append('Password', 'o*byte*lbWVAr26+qIwQkwc3v7g==');
    headers = headers.append('IPartnerUserID', 'XLtmRwnzXXH0cLtDnTeJNQ==');
    return this.http
      .get(CommonData.payURL + '/Authenticate', { headers: headers })
      .toPromise();
  }

  plutosRediretion(endPoint: any, body: any) {
    let payAuthToken = JSON.parse(localStorage.getItem('PayAuthToken'));
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + payAuthToken.accessToken
    );
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .post(CommonData.payURL + endPoint, body, { headers: headers })
      .toPromise();
  }

  isUndefineORNull(data: any) {
    if (data == undefined || data == '' || data == null) {
      return true;
    } else {
      return false;
    }
  }

  hexToBase64(str: any) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, '')
          .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
          .replace(/ +$/, '')
          .split(' ')
      )
    );
  }

  base64ToHex(str: any) {
    for (
      var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = [];
      i < bin.length;
      ++i
    ) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = '0' + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join('');
  }

  encrypt(msg: any, pass: any) {
    var salt = CryptoJS.lib.WordArray.random(this.saltSize / 8);
    var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations,
    });
    var iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);
    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    var encryptedHex = this.base64ToHex(encrypted.toString());
    var base64result = this.hexToBase64(
      salt.toString() + iv.toString() + encryptedHex
    );
    return base64result;
  }

  decrypt(encrypted: string) {
    encrypted = encrypted.replace(' ', '+');
    let byte = btoa(encrypted);
    const keyHex = CryptoJS.enc.Utf8.parse('e78538a1-9bae-4a3e-9bc9-');
    const iv = CryptoJS.enc.Utf8.parse('ef17086a');
    const mode = CryptoJS.mode.CBC;
    const decrypted = CryptoJS.TripleDES.decrypt(byte, keyHex, { iv, mode });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  postWithFormData(endPoint: any, file: File) {
    this.AuthToken = JSON.parse(localStorage.getItem('AuthToken'));
    this.agentID = localStorage.getItem('agentID');
    // let data = window.atob(agentID);
    // let data1 = data.split('&');
    // let data2 = data1[0];
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.AuthToken.access
    );
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('agent_id', this.agentID);
    console.log(formData);
    return this.http
      .post(CommonData.baseURL + endPoint, formData, { headers: headers })
      .toPromise();
  }

  // save(file: string, fileName: string) {
  //   // console.log(file);
  //   if (window.navigator.msSaveOrOpenBlob) {
  //     navigator.msSaveBlob(file, fileName);
  //   } else {
  //     // console.log('creation');
  //     const downloadLink = document.createElement('a');
  //     downloadLink.style.display = 'none';
  //     document.body.appendChild(downloadLink);
  //     downloadLink.setAttribute('href', file);
  //     downloadLink.setAttribute('download', fileName);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //     // console.log('clicked');
  //   }
  // }

  getExcel() {
    let data =
      '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';
    var contentType = 'application/vnd.ms-excel';
    // var blob1 = b64toBlob(data, contentType);
    var blob1 = b64toBlob(data, 'application/vnd.ms-excel');
    var blobUrl1 = URL.createObjectURL(blob1);
    window.open(blobUrl1);
  }

  encryptLikePython(value: any) {
    var key = CryptoJS.enc.Utf8.parse('e78538a1-9bae-4a3e-9bc9-');
    var iv = CryptoJS.enc.Utf8.parse('d45913c1-a-6bc3-');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decryptLikePython(value: any) {
    var key = CryptoJS.enc.Utf8.parse('e78538a1-9bae-4a3e-9bc9-');
    var iv = CryptoJS.enc.Utf8.parse('d45913c1-a-6bc3-');
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }


  // MOTOR BITLY API'S

  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNqZXRoYW5pNjUxQGdtYWlsLmNvbSIsIm5iZiI6MTYzMTYwNTkwNywiZXhwIjoxNjMxNjA3NzA3LCJpYXQiOjE2MzE2MDU5MDd9.QVj3NZBC1s1P_3vBQM88X8npGjMabLdeX65ZmhSSmEU'
  getWheelInfo(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append(
      'Authorization',
      'Bearer ' + this.token
    );
    return this.http.post(CommonData.motorbitlynew_url + 'api/WheelInfo', body, { headers: headers }).toPromise();
  }

  getMakenModel() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(CommonData.motorbitlynew_url + 'api/GetMakenModel', { headers: headers }).toPromise();
  }

  getPremium(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(CommonData.motorbitlynew_url + 'api/GetPremium', body, { headers: headers }).toPromise();
  }

  CreateCall(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(CommonData.motorbitlynew_url + 'api/CreateCall', body, { headers: headers }).toPromise();
  }

  ValidateCoupon(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(CommonData.motorbitlynew_url + 'api/ValidateCoupon', body, { headers: headers }).toPromise();
  }

  SendPreviousPolicy(body: any) {
    console.info(body)
    let ID = JSON.parse(sessionStorage.getItem('call_ID'));
    let CALL_ID = ID.call_ID
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('CallID', CALL_ID.toString());
    console.info(headers)
    return this.http.post(CommonData.motorbitlynew_url + 'api/SendPreviousPolicy', body, { headers: headers }).toPromise();
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

  formatDate_v2(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  validateEmail(email: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}