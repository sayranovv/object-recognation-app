import {Component, Input} from '@angular/core';
import {PercentPipe, UpperCasePipe} from "@angular/common";
import {PredictionType} from '../types/types';

@Component({
  selector: 'app-prediction',
  imports: [
    PercentPipe,
    UpperCasePipe
  ],
  template: `
    <div class="prediction-box">
      <p class="category-text">{{ prediction?.category | uppercase }}</p>
      <p class="category-accuracy">{{ prediction?.score | percent }} Accuracy</p>
    </div>
  `,
  styles: `
    .prediction-box {
      margin-top: 12px;
      text-align: center;
    }

    .category-text {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .category-accuracy {
      font-size: 18px;
      color: #666;
    }
  `,
})
export class Prediction {
  @Input({required: true}) prediction: PredictionType | null = null
}
