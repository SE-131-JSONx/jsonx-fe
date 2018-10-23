import { Component } from '@angular/core';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor (public authService: BackendService) {}

  // noinspection JSMethodCanBeStatic
  openGithub() {
    window.open('https://github.com/SE-131-JSONx', '_blank');
  }
}

