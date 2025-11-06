import { Component } from '@angular/core';
import {ImageControl} from './components/image-control';

@Component({
  selector: 'app-root',
  imports: [ImageControl],
  template: '<app-image-control />',
})
export class App {}
