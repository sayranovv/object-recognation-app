import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PredictionType} from '../../types/types';
import {Upload} from '../../services/upload';
import {AsyncPipe} from '@angular/common';
import {api_key} from '../../keys/api_keys';
import {Image} from '../image/image';
import {Prediction} from '../prediction/prediction';

@Component({
  selector: 'app-image-control',
  imports: [
    AsyncPipe,
    Image,
    Prediction
  ],
  templateUrl: './image-control.html',
  styleUrl: './image-control.css',
})
export class ImageControl {
  imageUrl: string | null = null;
  selectedFile: File | null = null;
  prediction$: Observable<PredictionType[] | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private uploadImageService: Upload) {
    this.prediction$ = this.uploadImageService.prediction$
    this.loading$ = this.uploadImageService.loadingSubject$
    this.error$ = this.uploadImageService.error$
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement
    const file = element.files?.[0]
    if (file) {
      this.selectedFile = file
      this.imageUrl = URL.createObjectURL(file)
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      of(
        this.uploadImageService
          .uploadImage(this.selectedFile, `${api_key}/predict`)
      ).subscribe({
        next: (v) => (this.prediction$ = v),
        error: (err) => (this.error$ = err),
        complete: () => console.info('Complete')
      })
    } else {
      console.error('No file selected')
    }
  }


}
