import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PredictionType} from '../types/types';
import {Upload} from '../services/upload';
import {AsyncPipe} from '@angular/common';
import {api_key} from '../keys/api_keys';
import {Image} from './image';
import {Prediction} from './prediction';

@Component({
  selector: 'app-image-control',
  imports: [
    AsyncPipe,
    Image,
    Prediction
  ],
  template: `
    <div class="container">
      <div class="inner-container">
        @if (!imageUrl) {
          <p class="text">Please upload your image</p>
        }

        @if (imageUrl) {
          <app-image [imageUrl]="imageUrl" />
        }

        @if (prediction$ | async; as predictions) {
          @if (predictions.length > 0) {
            <app-prediction [prediction]="predictions[0]" />
          }
        }

        @if (error$ | async; as error) {
          <p class="error">{{ error }}</p>
        }

        <label for="fileUpload">Choose File</label>
        <input id="fileUpload" type="file" (change)="onFileSelected($event)" accept="image/*">
        <button (click)="uploadImage()" [disabled]="!selectedFile">{{ (imageUrl ? 'Identify Image' : 'Upload Image') }}</button>

        @if (loading$ | async) {
          <p class="text">Uploading and processing image</p>
        }
      </div>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-width: 100vw;
      background-color: #222;
    }

    .inner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 700px;
      padding: 20px;
      background-color: #333;
      border-radius: 24px;
      border: 1px solid #555;
      width: 100%;
      max-width: 400px;
    }

    .error {
      color: #ff0000;
      margin-top: 10px;
    }

    .text {
      font-size: 18px;
      margin: 1.5rem 0;
    }

    label {
      margin-top: 12px;
      display: inline-block;
      padding: 10px 18px;
      background-color: #4f46e5;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s ease;
      width: 50%;
      text-align: center;
    }

    label:hover {
      background-color: #4338ca;
    }

    input[type="file"] {
      display: none;
    }

    button {
      margin-top: 12px;
      padding: 10px 18px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      width: 50%;
      transition: background 0.2s ease;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `,
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
