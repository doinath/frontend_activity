import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@ntv360/component-pantry';
import { NavigationLoaderService } from '../../../../core/services/navigation-loader.service';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { ContactService } from '../../../../core/services/contact.service';
import { ContactInfo } from '../../../../shared/interfaces/contact-info.interface';
import { SocialLink } from '../../../../shared/interfaces/social-link.interface';
import { ContactFormValue } from '../../../../shared/interfaces/contact-form-value.interface';
import { CONTACT_INFO, CONTACT_SOCIAL_LINKS } from '../../constants/contact-info.constant';

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
  private readonly navigationLoader = inject(NavigationLoaderService);

  protected readonly contactInfo: ContactInfo[] = CONTACT_INFO;
  protected readonly socialLinks: SocialLink[] = CONTACT_SOCIAL_LINKS;
  protected readonly isSubmitting = this.contactService.isSubmitting;
  protected readonly submitted: WritableSignal<boolean> = signal<boolean>(false);

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
   * @description Intercepts the LinkedIn icon so it shows the loading
   * overlay before handing off; other social icons navigate normally.
   * @param event The click event, prevented only for the LinkedIn icon.
   * @param link The social link being activated.
   */
  protected onSocialClick(event: MouseEvent, link: SocialLink): void {
    if (link.icon !== 'icon-linkedin') {
      return;
    }

    event.preventDefault();
    this.navigationLoader.redirectWithLoading(link.href);
  }
}
