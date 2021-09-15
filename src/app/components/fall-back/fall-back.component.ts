import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { CommonData } from 'src/app/common/commonData';

@Component({
  selector: 'app-fall-back',
  templateUrl: './fall-back.component.html',
  styleUrls: ['./fall-back.component.scss'],
})
export class FallBackComponent implements OnInit {
  URL: any;
  agentId: any;

  constructor(
    public sanitizer: DomSanitizer,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public cs: CommonService
  ) {}

  ngOnInit() {
    this.cs.loader = true;
    this.getParams();
  }

  getParams() {
    this.activeRoute.queryParams.forEach((params: any) => {
      console.log(params);
      this.cs.loader = true;
      this.agentId = params.agentId;
      console.log(this.agentId);
      let data = this.cs.decryptLikePython(this.agentId);
      console.log(data);
      let data1 = data.split('|');
      let data2 = data1[1];
      this.cs.agentID = data1[0];
      localStorage.setItem('agentID', JSON.stringify(this.cs.agentID));
      console.log(this.cs.agentID, CommonData.agentID);
      if (
        this.cs.agentID == 'IM-382833' ||
        this.cs.agentID == 'IM-368737' ||
        this.cs.agentID == 'IM-381715' ||
        this.cs.agentID == 'IM-814643' ||
        this.cs.agentID == 'IM-768326' ||
        this.cs.agentID == 'IM-546438'
      ) {
        this.router.navigateByUrl('fileUpload');
        this.cs.loader = false;
      } else {
        location.href = CommonData.loginUrl;
        this.cs.loader = false;
      }
      // CommonData.agentID.forEach((agent:any) => {
      //   if(agent.agentID == this.cs.agentID){
      //     this.router.navigateByUrl('fileUpload');
      //   }else{
      //     location.href = CommonData.loginUrl;
      //     this.cs.loader = false;
      //   }
      // });
      // var timeDiff = Math.abs(Date.now() - new Date(data2).getTime());
      // let min = Math.round((timeDiff / (1000 * 60)) % 60);
      // console.log(data, data1, data2, this.cs.agentID, min);
      // if (min < 15) {
      //   localStorage.setItem('agentID', this.agentId);
      //   this.cs.loader = false;
      // } else {
      //   location.href = CommonData.loginUrl;
      //   this.cs.loader = false;
      // }
    });
  }
}
