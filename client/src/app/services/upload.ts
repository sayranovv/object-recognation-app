import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Prediction} from '../types/types';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Upload {
  private predictionSubject = new BehaviorSubject<Prediction[] | null>(null)
  private loadingSubject = new BehaviorSubject<boolean>(false)
  private errorSubject = new BehaviorSubject<string | null>(null)

  prediction$ = this.predictionSubject.asObservable()
  loadingSubject$ = this.loadingSubject.asObservable()
  error$ = this.errorSubject.asObservable()

  constructor(private http: HttpClient) {

  }

  uploadImage(file: File, uploadUrl: string): Observable<Prediction[]> {
    const formData = new FormData()
    formData.append('file', file)

    this.loadingSubject.next(true)
    this.errorSubject.next(null)

    return this.http.post<Prediction[]>(uploadUrl, formData).pipe(
      tap((predictions) => {
        this.predictionSubject.next(predictions)
        this.loadingSubject.next(false)
      }),
      catchError(this.handleError)
    )

  }

  private handleError = (error: HttpErrorResponse) => {
    this.loadingSubject.next(false)
    let errorMessage = "An unknown error occurred"
    if (error.error instanceof ErrorEvent) {
      errorMessage = `error: ${error.error.message}`
    } else {
      errorMessage = `error code: ${error.status}\nMessage: ${error.message}`
    }

    this.errorSubject.next(errorMessage)
    return throwError(() => new Error(errorMessage))
  }
}
