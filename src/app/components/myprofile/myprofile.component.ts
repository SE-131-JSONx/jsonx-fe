import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  constructor(private backendService: BackendService) {
    backendService.getUserDetails(1, (error, r) => {
      console.log(error);
      console.log(r);
    });
  }



  ngOnInit() {
  }

}
