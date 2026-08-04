import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@ntv360/component-pantry';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { Stat } from '../../../../shared/interfaces/stat.interface';
import { HERO_STATS } from '../../constants/hero-stats.constant';

/** @description Above-the-fold hero: headline, subhead, CTAs, and quick stats. */
@Component({
  selector: 'nctv-hero',
  imports: [EyebrowBadge, StatCard, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly stats: Stat[] = HERO_STATS;

  /**
   * @description Smooth-scrolls to an in-page section anchor. Used by the
   * hero CTAs since `ntv-button` renders a `<button>`, not an `<a>`.
   * @param fragment CSS selector for the target section, e.g. "#model".
   */
  protected scrollToSection(fragment: string): void {
    document.querySelector(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
