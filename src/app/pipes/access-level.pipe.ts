import { Pipe, PipeTransform } from '@angular/core';
import {AccessLevel} from '../util/enums/access-level.enum';

@Pipe({
  name: 'accessLevel'
})
export class AccessLevelPipe implements PipeTransform {

  transform(value: string, args: string): string {
    return AccessLevel[value];
  }

}
