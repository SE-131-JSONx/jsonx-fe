import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})

export class EditUserDialogComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditUserDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.editUserForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', Validators.required, Validators.email],
    });

    // initialize default form fields
    this.editUserForm.controls['name'].setValue(this.data.name);
    this.editUserForm.controls['surname'].setValue(this.data.surname);
    this.editUserForm.controls['email'].setValue(this.data.email);
  }
  cancel(): void {
    this.dialogRef.close();
  }
  update() {
    this.loadingService.loading = true;

    const uid = this.data.user_id;

    const details = {
      name: this.editUserForm.controls['name'].value,
      surname: this.editUserForm.controls['surname'].value,
      email: this.editUserForm.controls['email'].value
    };

    this.backendService.updateUserDetails(uid, details, (error, r) => {
      this.loadingService.stop();
      this.dialogRef.close(true);
    });
  }
}
