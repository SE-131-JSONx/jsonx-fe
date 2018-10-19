import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { globals } from '../../util/globals';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Profile, ProfileInit } from '../../util/interfaces';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  profile: Profile = ProfileInit();

  constructor(private backendService: BackendService,
              private dialog: MatDialog) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(globals.JWT);
    const user_id = decodedToken ? decodedToken.user_id : null;

    this.backendService.getUserDetails(user_id, (error, r) => {
      this.profile = <Profile> r;
      this.name.patchValue(r.name);
      this.surname.patchValue(r.surname);
      this.email.patchValue(r.email);
    });
  }

  ngOnInit() {
  }

  openEditUserDialog(): void {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(globals.JWT);
    const user_id = decodedToken.user_id;

    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      height: '550px',
      data: {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        user_id: user_id,
      },
    });
    dialogRef.afterClosed().subscribe((edited) => {
      if (edited) {
        this.backendService.getUserDetails(user_id, (error, r) => {
          this.profile = <Profile> r;
          this.name.patchValue(r.name);
          this.surname.patchValue(r.surname);
          this.email.patchValue(r.email);
        });
      }
    });
  }

}
