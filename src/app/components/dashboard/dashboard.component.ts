import { Component, OnInit } from '@angular/core';
import {Profile, ProfileInit} from '../../util/interfaces';
import {BackendService} from '../../services/backend.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {globals} from '../../util/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: Profile = ProfileInit();

  constructor(private backendService: BackendService) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(globals.JWT);
    const user_id = decodedToken ? decodedToken.user_id : null;

    this.backendService.getUserDetails(user_id, (error, r) => {
      this.profile = <Profile> r;
    });
  }

  ngOnInit() {
  }
}
