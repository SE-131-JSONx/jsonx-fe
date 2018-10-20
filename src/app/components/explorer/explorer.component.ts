import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SaveJsonDialogComponent } from '../../dialogs/save-json-dialog/save-json-dialog.component';
import { UpdateJsonDialogComponent } from '../../dialogs/update-json-dialog/update-json-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  private _jsonEditor: string;
  public defaultJson: object = {
    text: 'Hello World!',
    array: [1, 2, 3, 4, 5],
    object: {
      more_text: 'This is a nested object.'
    }
  };
  private _json: object = this.defaultJson;

  public disableSave = true;
  public disableUpdate = true;

  options = {
    language: 'json'
  };

  constructor(public dataService: DataService,
              private dialog: MatDialog,
              public router: Router
  ) { }

  ngOnInit() {
    if (this.dataService.hasData) {
      this._jsonEditor = this.dataService.json.data;
      this.json = JSON.parse(this.jsonEditor);
    } else if (this.defaultJson) {
      this._jsonEditor = JSON.stringify(this.defaultJson, null, '\t');
    }
  }

  clearJson(): void {
    this.dataService.json = null;
    this._jsonEditor = '';
    this.defaultJson = null;
  }

  get jsonEditor(): string {
    return this._jsonEditor;
  }

  @Input()
  set jsonEditor(jsonEditor: string) {
    if (jsonEditor) {
      this.json = JSON.parse(jsonEditor);
      if (this.dataService.hasData && this.dataService.json.data === jsonEditor) {
        this.disableSave = true;
        this.disableUpdate = true;
      } else if (jsonEditor === JSON.stringify(this.defaultJson, null, '\t')) {
        this.disableSave = true;
      } else {
        if (!this.dataService.hasData) {
          this.disableUpdate = true;
        } else {
          this.disableUpdate = false;
        }
        this.disableSave = false;
      }
    } else {
      this.json = {};
      this.disableSave = true;
    }
  }

  get json(): object {
    return this._json;
  }

  set json(value: object) {
    this._json = value;
  }

  openSaveJsonDialog() {
    const dialogRef = this.dialog.open(SaveJsonDialogComponent, {
      width: '500px',
      height: '550px',
      data: JSON.stringify(this.json, null, '\t'),
    });
    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.router.navigateByUrl('/json');      }
    });
  }

  openUpdateJsonDialog(json) {
    const dialogRef = this.dialog.open(UpdateJsonDialogComponent, {
      width: '500px',
      height: '550px',
      data: json,
    });
    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.router.navigateByUrl('/json');      }
    });
  }

}
