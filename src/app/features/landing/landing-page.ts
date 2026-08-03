import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from '../../shared/interfaces/nav-link.interface';
import { SectionNav } from '../../shared/components/section-nav/section-nav';
import { SiteHeader } from './components/site-header/site-header';
import { Hero } from './components/hero/hero';
import { OurModel } from './components/our-model/our-model';
import { ServicesSection } from './components/services-section/services-section';
import { Podcast } from './components/podcast/podcast';
import { Contact } from './components/contact/contact';
import { SiteFooter } from './components/site-footer/site-footer';
import { SECTION_NAV_LINKS } from './constants/section-nav-links.constant';

/**
 * @description Composes every landing-page section (Figma node 6:58) in
 * document order and provides the shared section-nav rail.
 */
@Component({
  selector: 'nctv-landing-page',
  imports: [SectionNav, SiteHeader, Hero, OurModel, ServicesSection, Podcast, Contact, SiteFooter],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  protected readonly sectionNavLinks: NavLink[] = SECTION_NAV_LINKS;
}
