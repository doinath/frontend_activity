import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NavLink } from '../../interfaces/nav-link.interface';

/** How long the rail stays visible before auto-hiding, in milliseconds. */
const AUTO_HIDE_DELAY_MS = 2000;

/** Rail dot size, gap, and top padding (px) — kept in sync with section-nav.css. */
const DOT_SIZE_PX = 38;
const DOT_GAP_PX = 4;
const RAIL_PADDING_PX = 6;

/** Sticky header height (px) — kept in sync with site-header.css — so a scrolled-to section's heading doesn't land underneath it. */
const HEADER_OFFSET_PX = 103;

/** How long the hand-rolled scroll-to-section animation runs, in milliseconds. */
const SCROLL_DURATION_MS = 600;

/**
 * @description Sticky rail of section shortcuts (Home/Model/Services/
 * Podcast/Contact) that highlights the section currently in view. Mirrors
 * the floating nav widget shown in each Figma frame. The label pill
 * auto-hides after a couple of seconds and pops back out — aligned to
 * whichever dot is active — briefly whenever the user scrolls.
 */
@Component({
  selector: 'nctv-section-nav',
  templateUrl: './section-nav.html',
  styleUrl: './section-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(window:resize)': 'onWindowScroll()',
  },
})
export class SectionNav implements OnInit, OnDestroy {
  public links: InputSignal<NavLink[]> = input.required<NavLink[]>();

  private readonly activePath: WritableSignal<string> = signal<string>('');
  private readonly visible: WritableSignal<boolean> = signal<boolean>(true);
  private hideTimeoutId: ReturnType<typeof setTimeout> | undefined;

  public activeLink: Signal<NavLink | undefined> = computed(() =>
    this.links().find((link) => link.path === this.activePath()),
  );

  protected readonly isVisible: Signal<boolean> = this.visible.asReadonly();

  /**
   * @description Vertical center (px, relative to the rail) of the active
   * dot, so the label pill can line up with whichever dot is highlighted.
   */
  protected readonly pillOffsetPx: Signal<number> = computed(() => {
    const index = Math.max(
      this.links().findIndex((link) => link.path === this.activePath()),
      0,
    );
    return RAIL_PADDING_PX + index * (DOT_SIZE_PX + DOT_GAP_PX) + DOT_SIZE_PX / 2;
  });

  /**
   * @description Establishes the initial active section (so the pill mounts
   * and fades in immediately, without waiting on the user's first scroll)
   * and starts the auto-hide countdown.
   */
  public ngOnInit(): void {
    this.onWindowScroll();
  }

  /** @description Clears any pending auto-hide timer so it doesn't leak past destroy. */
  public ngOnDestroy(): void {
    this.clearAutoHide();
  }

  /**
   * @description Recomputes which section is closest to the viewport center
   * on every scroll tick (and on window resize/orientation change, so the
   * pill doesn't go stale after a layout shift), updates the active-path
   * signal, and re-reveals the pill label for another auto-hide cycle.
   */
  protected onWindowScroll(): void {
    const viewportCenter = window.innerHeight / 2;
    let closestPath = this.activePath();
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const link of this.links()) {
      const section = document.querySelector(link.path);
      if (!section) {
        continue;
      }
      const bounds = section.getBoundingClientRect();
      const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPath = link.path;
      }
    }

    this.activePath.set(closestPath);
    this.visible.set(true);
    this.scheduleAutoHide();
  }

  /**
   * @description (Re)starts the countdown that hides the pill label after
   * `AUTO_HIDE_DELAY_MS`, cancelling any timer already in flight.
   */
  private scheduleAutoHide(): void {
    this.clearAutoHide();
    this.hideTimeoutId = setTimeout(() => this.visible.set(false), AUTO_HIDE_DELAY_MS);
  }

  /** @description Cancels the pending auto-hide timer, if any. */
  private clearAutoHide(): void {
    if (this.hideTimeoutId !== undefined) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  /**
   * @description Intercepts a rail dot/pill click and animates the scroll to
   * the target section by hand via `requestAnimationFrame`, offset by the
   * sticky header's height so the section heading doesn't land underneath
   * it. A hand-rolled animation is used deliberately instead of the
   * browser's native `scrollIntoView({ behavior: 'smooth' })` / CSS
   * `scroll-behavior: smooth` — several browsers silently downgrade native
   * smooth scrolling to an instant jump when the OS has reduced-motion
   * enabled, which defeats the purpose here since the scroll itself is the
   * whole interaction, not decorative motion layered on top of it.
   * @param event Click event, prevented so the anchor's default instant
   * jump doesn't fire before the animated scroll starts.
   * @param path Section hash (e.g. `#model`) to scroll to.
   */
  protected onNavClick(event: Event, path: string): void {
    event.preventDefault();
    const target = document.querySelector(path);
    if (!target) {
      return;
    }

    const startY = window.scrollY;
    const targetY = Math.max(startY + target.getBoundingClientRect().top - HEADER_OFFSET_PX, 0);
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
