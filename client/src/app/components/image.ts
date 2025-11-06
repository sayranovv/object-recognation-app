import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  template: `
    <div class="image-container">
      <img [src]="imageUrl" alt="Uploaded" class="image" />
    </div>
  `,
  styles: `
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 12px;
      margin-bottom: 20px;
      overflow: hidden;
      box-shadow: 0 4px 16px #222;
    }

    .image {
      max-width: 300px;
      max-height: 300px;
      object-fit: contain;
    }
  `,
})
export class Image {
  @Input({required: true}) imageUrl: string = ''
}
