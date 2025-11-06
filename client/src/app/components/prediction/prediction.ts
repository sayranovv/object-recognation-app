import {Component, Input} from '@angular/core';
import {PercentPipe, UpperCasePipe} from "@angular/common";
import {PredictionType} from '../../types/types';

@Component({
  selector: 'app-prediction',
  imports: [
    PercentPipe,
    UpperCasePipe
  ],
  templateUrl: './prediction.html',
  styleUrl: './prediction.css',
})
export class Prediction {
@Input({required:true}) prediction: PredictionType | null = null
}
