import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NctvLogo } from '../../../../shared/components/nctv-logo/nctv-logo';
import { NavLink } from '../../../../shared/interfaces/nav-link.interface';
import { SocialLink } from '../../../../shared/interfaces/social-link.interface';
import { ContactInfo } from '../../../../shared/interfaces/contact-info.interface';
import { SECTION_NAV_LINKS } from '../../constants/section-nav-links.constant';
import { CONTACT_INFO, CONTACT_SOCIAL_LINKS } from '../../constants/contact-info.constant';

/**
 * @description "09 - Footer" frame: logo, tagline, section nav, contact
 * details, legal line, and socials.
 */
@Component({
  selector: 'nctv-site-footer',
  imports: [NctvLogo],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly navLinks: NavLink[] = SECTION_NAV_LINKS;
  protected readonly socialLinks: SocialLink[] = CONTACT_SOCIAL_LINKS;
  protected readonly contactInfo: ContactInfo[] = CONTACT_INFO;
  protected readonly year: number = 2026;
}
