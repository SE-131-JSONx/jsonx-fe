import { Injectable } from '@angular/core';
import {JsonDetails} from '../util/interfaces';

/**
 * This service passes data between My JSON and Explorer components.
 * */

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _json: JsonDetails;
  constructor() { }

  get json(): JsonDetails {
    return this._json;
  }

  set json(value: JsonDetails) {
    this._json = value;
  }

  get hasData(): boolean {
    return !(this.json == null);
  }
}
