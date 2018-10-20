import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-save-json-dialog',
  templateUrl: './save-json-dialog.component.html',
  styleUrls: ['./save-json-dialog.component.scss']
})
export class SaveJsonDialogComponent implements OnInit {
  saveJsonForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<SaveJsonDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.saveJsonForm = this._formBuilder.group({
      title: ['', [Validators.required]]
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
  save() {
    this.loadingService.loading = true;

    const details = {
      title: this.saveJsonForm.controls['title'].value,
      data: this.data
    };

    this.backendService.saveJson(details, (error, r) => {
      console.log(error);
      console.log(r);
      this.loadingService.stop();
      this.dialogRef.close(true);
    });
  }
}
