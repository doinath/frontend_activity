import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { Stat } from '../../../../shared/interfaces/stat.interface';
import { JOURNEY_STATS } from '../../constants/journey-stats.constant';

/**
 * @description "02 - Model" frame: the dealership pitch (image + copy) and
 * the "Our journey" track-record stat grid beneath it.
 */
@Component({
  selector: 'nctv-our-model',
  imports: [EyebrowBadge, StatCard, NgOptimizedImage],
  templateUrl: './our-model.html',
  styleUrl: './our-model.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurModel {
  protected readonly journeyStats: Stat[] = JOURNEY_STATS;

  // TODO: self-host this photo under public/images/ before shipping —
  // the Figma-hosted URL below expires ~7 days after export.
  protected readonly storefrontImage =
    'https://www.figma.com/api/mcp/asset/e6e81f8a-62a6-482a-be45-6127bbda4b52';
}
