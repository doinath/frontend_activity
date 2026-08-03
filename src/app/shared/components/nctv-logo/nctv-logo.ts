import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type NctvLogoVariant = 'full' | 'compact';

/**
 * @description N-Compass TV logo, rendered from the real exported artwork
 * at `src/assets/nctv_logo.png`. `full` is the header size; `compact` scales
 * it down for the tighter footer row.
 */
@Component({
  selector: 'nctv-logo',
  imports: [NgOptimizedImage],
  templateUrl: './nctv-logo.html',
  styleUrl: './nctv-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NctvLogo {
  public variant: InputSignal<NctvLogoVariant> = input<NctvLogoVariant>('full');
}
