import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { globals } from '../../util/globals';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  profile: object = {
    name: '',
    surname: '',
    email: '',
    created: ''
  };

  constructor(private backendService: BackendService) {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(globals.JWT);
    const user_id = decodedToken.user_id;

    this.backendService.getUserDetails(user_id, (error, r) => {
      this.profile = r;
    });
  }


  ngOnInit() {
  }

}
