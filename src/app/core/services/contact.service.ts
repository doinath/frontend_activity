import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ContactFormValue } from '../../shared/interfaces/contact-form-value.interface';

/**
 * @description Handles submission of the "Request a call" contact form.
 * Swap the stubbed `of()` call for a real HTTP POST once the intake
 * endpoint exists; the `isSubmitting` signal is already wired for it.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly _isSubmitting: WritableSignal<boolean> = signal<boolean>(false);

  public readonly isSubmitting = this._isSubmitting.asReadonly();

  /**
   * @description Submits the contact form payload.
   * @param value The validated form value to submit.
   * @returns An observable that emits once the submission completes.
   */
  public submit(value: ContactFormValue): Observable<void> {
    this._isSubmitting.set(true);
    return of(undefined).pipe(
      delay(600),
      tap(() => this._isSubmitting.set(false)),
    );

    // --- API calls -----------------------------------------------------
    // return this.http.post<void>('/api/contact', value).pipe(
    //   withLoading(this._isSubmitting),
    // );
  }
}
