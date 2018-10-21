import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-update-json-dialog',
  templateUrl: './update-json-dialog.component.html',
  styleUrls: ['./update-json-dialog.component.scss']
})
export class UpdateJsonDialogComponent implements OnInit {
  updateJsonForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateJsonDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.updateJsonForm = this._formBuilder.group({
      title: ['', [Validators.required]]
    });
    this.updateJsonForm.controls['title'].setValue(this.data.title);
  }
  cancel(): void {
    this.dialogRef.close();
  }
  update() {
    this.loadingService.loading = true;

    const details = {
      title: this.updateJsonForm.controls['title'].value,
      data: JSON.stringify(this.data.json, null, '\t'),
    };

    this.backendService.updateJson(this.data.id, details, (error, r) => {
      this.loadingService.stop();
      this.dialogRef.close(r);
    });
  }
}
