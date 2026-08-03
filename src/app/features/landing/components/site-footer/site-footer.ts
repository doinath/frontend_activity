import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NctvLogo } from '../../../../shared/components/nctv-logo/nctv-logo';
import { NavLink } from '../../../../shared/interfaces/nav-link.interface';
import { FOOTER_NAV_LINKS } from '../../constants/footer-nav-links.constant';
import { FOOTER_SOCIAL_LINKS } from '../../constants/footer-social-links.constant';

/** @description "09 - Footer" frame: logo, nav links, legal line, socials. */
@Component({
  selector: 'nctv-site-footer',
  imports: [NctvLogo],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly navLinks: NavLink[] = FOOTER_NAV_LINKS;
  protected readonly socialLinks: ReadonlyArray<{ label: string; href: string }> = FOOTER_SOCIAL_LINKS;
  protected readonly year: number = 2026;
}
