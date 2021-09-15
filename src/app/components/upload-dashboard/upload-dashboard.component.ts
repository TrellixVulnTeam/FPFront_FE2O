import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-dashboard',
  templateUrl: './upload-dashboard.component.html',
  styleUrls: ['./upload-dashboard.component.scss']
})
export class UploadDashboardComponent implements OnInit {

  agentID: any; dashBoardData: any;

  constructor(public cs: CommonService) { }

  ngOnInit() {
    this.agentID = localStorage.getItem('agentID');
    console.log(this.agentID);
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.cs.loader = true;
    let agentID = this.cs.encryptLikePython(this.cs.agentID)
    this.cs.get("dashboard?agent_id="+agentID).then((res: any) => {
      console.log(res);
      this.dashBoardData = res.data;
      this.cs.loader = false;
    });
  }

}
