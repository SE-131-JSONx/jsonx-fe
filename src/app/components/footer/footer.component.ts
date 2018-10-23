import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor () {}

  // noinspection JSMethodCanBeStatic
  openGithub() {
    window.open('https://github.com/SE-131-JSONx', '_blank');
  }
}
