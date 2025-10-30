import {Component} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-image-control',
  imports: [],
  templateUrl: './image-control.html',
  styleUrl: './image-control.css',
})
export class ImageControl {
  imageUrl: string | null = null;
  selectedFile: File | null = null;
  // prediction$: Observable<any[] | null>;
  // loading$: Observable<boolean>;
  // error$: Observable<string | null>;



}
