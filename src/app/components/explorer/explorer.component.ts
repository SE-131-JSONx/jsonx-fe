import { Component, Input, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';


const defaultJson: object = {
  text: 'Hello World!',
  array: [1, 2, 3, 4, 5],
  object: {
    more_text: 'This is a nested object.'
  }
};

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  private _json: object = defaultJson;
  private _jsonEditor: string = JSON.stringify(defaultJson, null, '\t');

  options = {
    language: 'json'
  };

  constructor(public dataService: DataService) { }

  ngOnInit() {
    if (this.dataService.hasData) {
      this._jsonEditor = this.dataService.json.data;
    }
  }

  get jsonEditor(): string {
    return this._jsonEditor;
  }

  @Input()
  set jsonEditor(jsonEditor: string) {
    if (jsonEditor) {
      this.json = JSON.parse(jsonEditor);
    } else {
      this.json = {};
    }
  }

  get json(): object {
    return this._json;
  }

  set json(value: object) {
    this._json = value;
  }

}
