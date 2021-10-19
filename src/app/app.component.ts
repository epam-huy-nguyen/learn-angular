import { Component } from '@angular/core';
import { TestElement } from './test-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    customElements.define('test-element', TestElement);
  }
  title = 'learn-angular';
}
