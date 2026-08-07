import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@ntv360/component-pantry';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { ContactService } from '../../../../core/services/contact.service';
import { ContactFormValue } from '../../../../shared/interfaces/contact-form-value.interface';
import { ContactStep } from '../../../../shared/interfaces/contact-step.interface';
import { CONTACT_STEPS } from '../../constants/contact-steps.constant';

/** @description "Contact" frame: contact details + the "Request a call" form. */
@Component({
  selector: 'nctv-contact',
  imports: [EyebrowBadge, Button, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  protected readonly isSubmitting = this.contactService.isSubmitting;
  protected readonly submitted: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly steps: ContactStep[] = CONTACT_STEPS;

  protected readonly form: FormGroup = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    market: ['', Validators.required],
    message: [''],
  });

  /**
   * @description Validates and submits the contact form, flipping the
   * `submitted` signal on success so the template can show a confirmation.
   */
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as ContactFormValue;
    this.contactService.submit(value).subscribe(() => {
      this.submitted.set(true);
      this.form.reset();
    });
  }

  /**
   * @description Whether a form control should currently display its error
   * state — invalid, and the user has either blurred or edited it.
   * @param controlName Name of the form control to check.
   * @returns True if the control is invalid and has been touched or dirtied.
   */
  protected isInvalid(controlName: keyof ContactFormValue): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /**
   * @description Resolves a human-readable validation message for whichever
   * validator is currently failing on a control.
   * @param controlName Name of the form control to check.
   * @returns The message to display, or an empty string if none applies.
   */
  protected getErrorMessage(controlName: keyof ContactFormValue): string {
    const errors = this.form.get(controlName)?.errors;
    if (!errors) {
      return '';
    }
    if (errors['required']) {
      return 'This field is required.';
    }
    if (errors['email']) {
      return 'Enter a valid email address.';
    }
    return '';
  }
}
