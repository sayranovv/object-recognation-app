import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.css',
})
export class Image {
  @Input({required: true}) imageUrl: string = ''
}
