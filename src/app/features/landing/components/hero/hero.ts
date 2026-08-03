import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { PillButton } from '../../../../shared/components/pill-button/pill-button';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { Stat } from '../../../../shared/interfaces/stat.interface';
import { HERO_STATS } from '../../constants/hero-stats.constant';

/** @description Above-the-fold hero: headline, subhead, CTAs, and quick stats. */
@Component({
  selector: 'nctv-hero',
  imports: [EyebrowBadge, PillButton, StatCard, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly stats: Stat[] = HERO_STATS;
}
