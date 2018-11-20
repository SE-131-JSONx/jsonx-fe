import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member-dialog.component.html',
  styleUrls: ['./remove-member-dialog.component.scss']
})
export class RemoveMemberDialogComponent implements OnInit {
  @ViewChild('users') users;
  userList: any;
  searchUserForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RemoveMemberDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.searchUserForm = this._formBuilder.group({
      user: ['', []]
    });

    this.backendService.searchTeamMember('', this.data.id, (e, r) => {
      console.log(e);
      console.log(r);
      this.userList = r;
    });
  }

  onSearchChange(q) {
    this.backendService.searchTeamMember(q, this.data.id, (e, r) => {
      console.log(e);
      console.log(r);
      this.userList = r;
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
  remove() {
    this.loadingService.loading = true;
    const users = this.users.selectedOptions.selected.map(item => item.value.id);

    this.backendService.removeTeamMember(this.data.id, users, (e, r) => {
      this.loadingService.stop();
      this.dialogRef.close(r);
    });

  }
}
