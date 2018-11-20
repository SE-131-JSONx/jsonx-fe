import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {
  editTeamForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditTeamDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.editTeamForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });

    // initialize default form fields
    this.editTeamForm.controls['name'].setValue(this.data.name);
  }
  cancel(): void {
    this.dialogRef.close();
  }
  update() {
    this.loadingService.loading = true;

    const tid = this.data.id;

    this.backendService.updateTeamDetails(tid, this.editTeamForm.controls['name'].value, (error, r) => {
      this.loadingService.stop();
      this.dialogRef.close(true);
    });
  }
}
