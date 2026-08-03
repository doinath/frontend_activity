import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Stat } from '../../interfaces/stat.interface';

export type StatCardVariant = 'inline' | 'card';

/**
 * @description Renders one metric. `inline` variant is used in the hero row
 * (no background), `card` variant is used in the "Our journey" 2x2 grid.
 */
@Component({
  selector: 'nctv-stat-card',
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  public stat: InputSignal<Stat> = input.required<Stat>();
  public variant: InputSignal<StatCardVariant> = input<StatCardVariant>('card');
}
