import { Component } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {globals} from '../../util/globals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor (public authService: BackendService) {}

  // noinspection JSMethodCanBeStatic
  openGithub() {
    window.open(globals.GITHUB_URL, '_blank');
  }
}

