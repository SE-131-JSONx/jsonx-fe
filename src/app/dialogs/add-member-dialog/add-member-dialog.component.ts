import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {
  @ViewChild('users') users;
  userList: any;
  searchUserForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddMemberDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.searchUserForm = this._formBuilder.group({
      user: ['', []]
    });
  }

  onSearchChange(q) {
    if (q) {
      this.backendService.searchUser(q, (e, r) => {
        console.log(e);
        console.log(r);
        this.userList = r;
      });
    } else {
      this.userList = [];
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  add() {
    this.loadingService.loading = true;
    const users = this.users.selectedOptions.selected.map(item => item.value.id);

    this.backendService.addTeamMember(this.data.id, users, (e, r) => {
      this.loadingService.stop();
      this.dialogRef.close(r);
    });

  }
}
