import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-unshare-json-dialog',
  templateUrl: './unshare-json-dialog.component.html',
  styleUrls: ['./unshare-json-dialog.component.scss']
})
export class UnshareJsonDialogComponent implements OnInit {
  @ViewChild('results') results;
  resultsList: any;
  searchForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UnshareJsonDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: ['', []]
    });

    this.backendService.searchJsonAccess(this.data.id, '', (e, r) => {
      this.resultsList = r;
    });
  }

  onSearchChange(q) {
    this.resultsList = [];
    if (q) {
      this.backendService.searchJsonAccess(this.data.id, q, (e, r) => {
        this.resultsList = r;
      });
    } else {
      this.resultsList = [];
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  remove() {
    this.loadingService.loading = true;
    const teams = [];
    const users = [];
    this.results.selectedOptions.selected.forEach(i => {
      if (i.value.hasOwnProperty('access_level')) {
        teams.push(i.value.id);
      } else {
        users.push(i.value.id);
      }
    });

    const details = {
      users: users,
      teams: teams
    };

    this.backendService.unshareJson(this.data.id, details, (e, r) => {
      this.loadingService.stop();
      this.dialogRef.close(r);
    });

  }
}
