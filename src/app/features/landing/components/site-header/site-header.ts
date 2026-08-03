import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NctvLogo } from '../../../../shared/components/nctv-logo/nctv-logo';

/** @description Sticky top navigation bar containing only the wordmark. */
@Component({
  selector: 'nctv-site-header',
  imports: [NctvLogo],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {}
