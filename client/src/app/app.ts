import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ImageControl} from './components/image-control/image-control';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageControl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
