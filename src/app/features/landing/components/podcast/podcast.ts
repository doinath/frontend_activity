import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { PodcastLink } from '../../../../shared/interfaces/podcast-link.interface';
import { PODCAST_LINKS } from '../../constants/podcast-links.constant';

/** @description "05 - Podcast" frame: player mock + listen-on links. */
@Component({
  selector: 'nctv-podcast',
  imports: [EyebrowBadge, NgOptimizedImage],
  templateUrl: './podcast.html',
  styleUrl: './podcast.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Podcast {
  protected readonly links: PodcastLink[] = PODCAST_LINKS;

  protected readonly coverImage = 'assets/beyond_the_boards.jpg';

  /** Relative bar heights (px) recreating the Figma waveform, longest first pattern. */
  protected readonly waveform: number[] = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 28, 18, 10, 24, 16];
}
