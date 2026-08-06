import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from '@ntv360/component-pantry';
import { SectionScrollService } from '../../../../core/services/section-scroll.service';
import { NctvLogo } from '../../../../shared/components/nctv-logo/nctv-logo';
import { NavLink } from '../../../../shared/interfaces/nav-link.interface';

/** Scroll distance (px) past which the header switches to its compact, scrolled state. */
const SCROLLED_THRESHOLD_PX = 24;

/** Sticky header height (px) — the offset used to decide whether Hero has scrolled past, or Contact has scrolled into, view for the header CTA. */
const HEADER_OFFSET_PX = 103;

/** CSS selector for elements the mobile menu's focus trap should cycle between. */
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

/**
 * @description Sticky top navigation bar with the wordmark, a persistent
 * "Book a call" CTA, and, on viewports below the desktop breakpoint (where
 * the floating section-nav rail is hidden), a hamburger-triggered menu of
 * the same section links. Compacts itself once the page has scrolled a bit,
 * and traps focus inside the mobile menu while it's open.
 */
@Component({
  selector: 'nctv-site-header',
  imports: [NctvLogo, Button],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
    '(document:keydown.tab)': 'onTabKeydown($event)',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class SiteHeader implements AfterViewInit {
  public links: InputSignal<NavLink[]> = input.required<NavLink[]>();

  private readonly sectionScroll = inject(SectionScrollService);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private readonly isScrolled: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Whether the Hero section (which has its own "Book a call" button) has
   * scrolled out from under the header. The header's own CTA only reveals
   * itself past this point, so the two buttons are never on screen at once.
   */
  private readonly isPastHero: WritableSignal<boolean> = signal<boolean>(false);

  /** Whether the Contact section is currently in view — its form is the CTA's own destination, so showing the button there is equally redundant. */
  private readonly isInContact: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly isCompact: Signal<boolean> = computed(
    () => this.isScrolled() && !this.isMenuOpen(),
  );

  /** Header CTA shows once Hero has scrolled away, and hides again once Contact (its own target) comes into view. */
  protected readonly isCtaVisible: Signal<boolean> = computed(
    () => this.isPastHero() && !this.isInContact(),
  );

  private menuToggleButton: HTMLButtonElement | null = null;

  /**
   * @description Caches the toggle button so focus can be restored to it
   * when the menu closes, and establishes the initial scrolled/past-hero
   * state without waiting on the user's first scroll event.
   */
  public ngAfterViewInit(): void {
    this.menuToggleButton = this.elementRef.nativeElement.querySelector<HTMLButtonElement>(
      '.site-header__menu-toggle',
    );
    this.onWindowScroll();
  }

  /**
   * @description Tracks scroll position so the header can compact itself
   * past a small threshold, and updates the two section-visibility signals
   * that gate the header CTA — hidden while Hero (above) or Contact (its
   * own destination) are the section actually in view.
   */
  protected onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > SCROLLED_THRESHOLD_PX);

    const heroBottom = document.querySelector('#hero')?.getBoundingClientRect().bottom;
    this.isPastHero.set(heroBottom !== undefined ? heroBottom <= HEADER_OFFSET_PX : true);

    const contactRect = document.querySelector('#contact')?.getBoundingClientRect();
    this.isInContact.set(
      contactRect !== undefined && contactRect.top <= HEADER_OFFSET_PX && contactRect.bottom > 0,
    );
  }

  /**
   * @description Opens the mobile menu if closed, closes it if open. Moves
   * focus to the first menu link on open so keyboard users land inside it
   * immediately.
   */
  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    if (this.isMenuOpen()) {
      queueMicrotask(() => this.focusFirstMenuItem());
    }
  }

  /**
   * @description Closes the mobile menu — used on link click, backdrop
   * click, Escape, and CTA click — and returns focus to the toggle button
   * so keyboard users don't lose their place.
   */
  protected closeMenu(): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(false);
    this.menuToggleButton?.focus();
  }

  /** @description Smooth-scrolls to the contact section, closing the mobile menu first if it's open. */
  protected onBookCallClick(): void {
    this.closeMenu();
    this.sectionScroll.scrollTo('#contact');
  }

  /**
   * @description Traps Tab/Shift+Tab focus inside the mobile menu while
   * it's open, so keyboard users can't tab out into the page content
   * sitting behind the backdrop.
   * @param event The originating Tab keydown event. Typed as `Event` (not
   * `KeyboardEvent`) because Angular's `host` object bindings declare
   * keydown-modifier listeners as `Event` — cast internally instead.
   */
  protected onTabKeydown(event: Event): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const menu = this.elementRef.nativeElement.querySelector<HTMLElement>('.site-header__menu');
    const focusable = menu ? Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /** @description Moves focus to the first focusable element inside the open mobile menu. */
  private focusFirstMenuItem(): void {
    const menu = this.elementRef.nativeElement.querySelector<HTMLElement>('.site-header__menu');
    menu?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
  }
}
