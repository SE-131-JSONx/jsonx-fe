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
  isActive = true;
  profile: Profile = ProfileInit();
  owned = 0;
  member = 0;
  newslists = [
    'Now you can share files across users and teams!',
    'You can view saved JSON Objects.',
    'You can search saved JSON Objects.',
    'Now you can generate automatic invitation by putting email address of non-users.',
    'Test if collapse and expend works. Team 4. Ben K, Ben B, Salvo, and Kyu. Thank you guys!. I have learned many from you guys! Thank you very much!'
  ];
  date = 'November, 2 2018';
  maxLength = 80; //only this need to be changed.

  constructor(private backendService: BackendService) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(globals.JWT);
    const user_id = decodedToken ? decodedToken.user_id : null;

    this.backendService.getUserDetails(user_id, (error, r) => {
      this.profile = <Profile> r;
    });
  }

  ngOnInit() {
    this.backendService.searchTeam(null, (e, r) => {
      r.forEach((team) => {
        if (team.access_level === 0) {
          this.owned += 1;
        }
        this.member += 1;
      });
    });
  }

  onClick($event) {
    this.isActive = !this.isActive;
  }
}
