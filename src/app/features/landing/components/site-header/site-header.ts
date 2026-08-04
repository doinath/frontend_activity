import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NctvLogo } from '../../../../shared/components/nctv-logo/nctv-logo';
import { NavLink } from '../../../../shared/interfaces/nav-link.interface';

/**
 * @description Sticky top navigation bar with the wordmark and, on
 * viewports below the desktop breakpoint (where the floating section-nav
 * rail is hidden), a hamburger-triggered menu of the same section links.
 */
@Component({
  selector: 'nctv-site-header',
  imports: [NctvLogo],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteHeader {
  public links: InputSignal<NavLink[]> = input.required<NavLink[]>();

  protected readonly isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  /** @description Opens the mobile menu if closed, closes it if open. */
  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  /** @description Closes the mobile menu — used on link click, backdrop click, and Escape. */
  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
