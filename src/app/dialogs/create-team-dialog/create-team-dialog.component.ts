import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss']
})
export class CreateTeamDialogComponent implements OnInit {
  saveTeamForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CreateTeamDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.saveTeamForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
  save() {
    this.loadingService.loading = true;

    const details = {
      name: this.saveTeamForm.controls['name'].value,
    };

    this.backendService.saveTeam(details, (error, r) => {
      console.log(error);
      console.log(r);
      this.loadingService.stop();
      this.dialogRef.close(true);
    });
  }
}
