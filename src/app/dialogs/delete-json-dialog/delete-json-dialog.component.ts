import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-delete-json-dialog',
  templateUrl: './delete-json-dialog.component.html',
  styleUrls: ['./delete-json-dialog.component.scss']
})
export class DeleteJsonDialogComponent implements OnInit {
  deleteJsonForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteJsonDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
    console.log(data);
  }

  ngOnInit(): void {
    this.deleteJsonForm = this._formBuilder.group({
      json: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  deleteJson() {
    this.loadingService.start('Deleting JSON...');
    this.backendService.deleteJson(this.data.id, (e, r) => {
      console.log(e);
      console.log(r);
    });
    this.loadingService.stop();
    this.dialogRef.close(true);
  }

}
