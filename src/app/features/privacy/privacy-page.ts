import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NctvLogo } from '../../shared/components/nctv-logo/nctv-logo';

/** @description Privacy Policy page. */
@Component({
  selector: 'nctv-privacy-page',
  imports: [NctvLogo],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPage {}
