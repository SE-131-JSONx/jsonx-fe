import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {NgxEditorModel} from 'ngx-monaco-editor';

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

  constructor(public dataService: DataService) { }

  ngOnInit() {
    if (this.dataService.hasData) {
      this._jsonEditor = this.dataService.json.data;
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

}
