import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

/**
 * @description Small uppercase mono label with a leading accent dot, used as
 * a section eyebrow (e.g. "OUR MODEL", "GO BEYOND THE SCREENS").
 */
@Component({
  selector: 'nctv-eyebrow-badge',
  templateUrl: './eyebrow-badge.html',
  styleUrl: './eyebrow-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EyebrowBadge {
  public label: InputSignal<string> = input.required<string>();
}
