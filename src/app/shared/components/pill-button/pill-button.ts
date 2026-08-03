import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

export type PillButtonVariant = 'solid' | 'outline';

/**
 * @description Rounded call-to-action button/link. Renders an `<a>` when
 * `href` is set, otherwise a `<button type="submit">` for form actions.
 */
@Component({
  selector: 'nctv-pill-button',
  templateUrl: './pill-button.html',
  styleUrl: './pill-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillButton {
  public label: InputSignal<string> = input.required<string>();
  public href: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public variant: InputSignal<PillButtonVariant> = input<PillButtonVariant>('solid');
  public isSubmit: InputSignal<boolean> = input<boolean>(false);
}
