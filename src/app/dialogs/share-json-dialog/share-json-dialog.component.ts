import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../../services/backend.service';
import {LoadingService} from '../../services/loading.service';


@Component({
  selector: 'app-share-json-dialog',
  templateUrl: './share-json-dialog.component.html',
  styleUrls: ['./share-json-dialog.component.scss']
})
export class ShareJsonDialogComponent implements OnInit {
  @ViewChild('results') results;
  resultsList: any;
  searchForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ShareJsonDialogComponent>,
              private _formBuilder: FormBuilder,
              public backendService: BackendService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: ['', []]
    });
  }

  onSearchChange(q) {
    this.resultsList = [];
    if (q) {
      this.backendService.searchUser(q, (e, r) => {
        this.resultsList = Array.from(new Set(this.resultsList.concat(r)));
      });
      this.backendService.searchTeam(q, (e, r) => {
        this.resultsList = Array.from(new Set(this.resultsList.concat(r)));
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  add() {
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

    this.backendService.shareJson(this.data.id, details, (e, r) => {
      this.loadingService.stop();
      this.dialogRef.close(r);
    });

  }
}
