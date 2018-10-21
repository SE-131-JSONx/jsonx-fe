import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-delete-team-dialog',
  templateUrl: './delete-team-dialog.component.html',
  styleUrls: ['./delete-team-dialog.component.scss']
})
export class DeleteTeamDialogComponent implements OnInit {
  deleteTeamForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteTeamDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
    console.log(data);
  }

  ngOnInit(): void {
    this.deleteTeamForm = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }


  cancel(): void {
    this.dialogRef.close(false);
  }

  deleteTeam() {
    this.loadingService.start('Deleting Team...');
    this.backendService.deleteTeam(this.data.id, (e, r) => {
      console.log(e);
      console.log(r);
    });
    this.loadingService.stop();
    this.dialogRef.close(true);
  }

}
