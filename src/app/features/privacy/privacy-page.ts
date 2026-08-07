import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { NctvLogo } from '../../shared/components/nctv-logo/nctv-logo';
import { EyebrowBadge } from '../../shared/components/eyebrow-badge/eyebrow-badge';
import { SiteFooter } from '../landing/components/site-footer/site-footer';
import { NavigationLoaderService } from '../../core/services/navigation-loader.service';

/** A single top-level policy section, as listed in the table of contents. */
interface PrivacySection {
  num: string;
  id: string;
  label: string;
}

/** Sticky topbar height (px) plus a little breathing room, so a section counts as "current" once it clears the header, not right as its heading touches the viewport edge. */
const SCROLL_OFFSET_PX = 96;

const SECTIONS: PrivacySection[] = [
  { num: '01', id: 'collection', label: 'Collection of Information' },
  { num: '02', id: 'use', label: 'Use of Your Data and Information' },
  { num: '03', id: 'share', label: 'How We Share Information' },
  { num: '04', id: 'log-files', label: 'Log Files' },
  { num: '05', id: 'choices', label: 'Your Choices / Opt‑Out Options' },
  { num: '06', id: 'controllers', label: 'Controllers and Responsible Companies' },
  { num: '07', id: 'retention', label: 'Retention and Security' },
  { num: '08', id: 'mailing-list', label: 'Mailing List' },
  { num: '09', id: 'changes', label: 'Notification of Changes' },
  { num: '10', id: 'contact', label: 'Contact N‑Compass TV' },
];

/** @description Privacy Policy page. */
@Component({
  selector: 'nctv-privacy-page',
  imports: [NctvLogo, EyebrowBadge, SiteFooter],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class PrivacyPage {
  private readonly navigationLoader = inject(NavigationLoaderService);

  protected readonly sections: PrivacySection[] = SECTIONS;

  private readonly activeId: WritableSignal<string> = signal<string>(SECTIONS[0].id);

  protected readonly isActive = (id: string): boolean => this.activeId() === id;

  constructor() {
    afterNextRender(() => this.onWindowScroll());
  }

  /**
   * @description Intercepts the "Back to home" link so the full-screen
   * loading overlay shows for a beat before navigating, matching the
   * transition used for the footer's Privacy Policy link.
   * @param event Click event, prevented so the anchor's default instant
   * navigation doesn't fire before the loading beat starts.
   */
  protected onBackClick(event: Event): void {
    event.preventDefault();
    this.navigationLoader.redirectWithLoading('/');
  }

  /**
   * @description Walks the sections top-to-bottom and marks the last one
   * that's scrolled up past the sticky header as active — the standard
   * table-of-contents scrollspy behavior, robust to sections of very
   * different lengths (some of these are one paragraph, others are long).
   * Once the page is scrolled to (or within a couple px of) the bottom, the
   * final section is forced active regardless of its exact offset — the
   * last section(s) can otherwise never cross the header threshold if
   * there isn't enough page left below them to scroll that far.
   */
  protected onWindowScroll(): void {
    const scrolledToBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    if (scrolledToBottom) {
      this.activeId.set(this.sections[this.sections.length - 1].id);
      return;
    }

    let currentId = this.sections[0].id;

    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (!element) {
        continue;
      }
      if (element.getBoundingClientRect().top - SCROLL_OFFSET_PX <= 0) {
        currentId = section.id;
      } else {
        break;
      }
    }

    this.activeId.set(currentId);
  }
}
