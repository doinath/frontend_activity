import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NctvLogo } from '../../shared/components/nctv-logo/nctv-logo';
import { EyebrowBadge } from '../../shared/components/eyebrow-badge/eyebrow-badge';
import { SiteFooter } from '../landing/components/site-footer/site-footer';

/** @description Privacy Policy page. */
@Component({
  selector: 'nctv-privacy-page',
  imports: [NctvLogo, EyebrowBadge, SiteFooter],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {}
