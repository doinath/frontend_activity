import { Injectable } from '@angular/core';

/** Sticky header height (px) — kept in sync with site-header.css — so a scrolled-to section's heading doesn't land underneath it. */
const HEADER_OFFSET_PX = 103;

/** How long the hand-rolled scroll-to-section animation runs, in milliseconds. */
const SCROLL_DURATION_MS = 220;

/**
 * @description Animates the page to an in-page section anchor by hand via
 * `requestAnimationFrame`, offset by the sticky header's height so the
 * target section's heading doesn't land underneath it. A hand-rolled
 * animation is used deliberately instead of the browser's native
 * `scrollIntoView({ behavior: 'smooth' })` / CSS `scroll-behavior: smooth`
 * — several browsers silently downgrade native smooth scrolling to an
 * instant jump when the OS has reduced-motion enabled, which defeats the
 * purpose here since the scroll itself is the whole interaction, not
 * decorative motion layered on top of it. Shared by the floating
 * section-nav rail and the header's "Book a call" CTA so both scroll
 * identically.
 */
@Injectable({ providedIn: 'root' })
export class SectionScrollService {
  /** rAF handle for the in-flight scroll animation, so a new call can cancel it instead of racing it. */
  private pendingFrameId: number | undefined;

  /**
   * @description Smooth-scrolls the window to the section matching `path`.
   * Cancels any scroll animation already in flight first — otherwise
   * spamming a nav link starts multiple overlapping `requestAnimationFrame`
   * loops that each drive `window.scrollTo` independently, fighting each
   * other and making the scroll look stuck or delayed.
   * @param path Section hash selector to scroll to, e.g. `#model`.
   */
  public scrollTo(path: string): void {
    const target = document.querySelector(path);
    if (!target) {
      return;
    }

    if (this.pendingFrameId !== undefined) {
      cancelAnimationFrame(this.pendingFrameId);
      this.pendingFrameId = undefined;
    }

    const startY = window.scrollY;
    const targetY = Math.max(startY + target.getBoundingClientRect().top - HEADER_OFFSET_PX, 0);
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      // `behavior: 'auto'` is required here — `styles.scss` sets `scroll-behavior: smooth`
      // globally, so without it each per-frame jump would get its own native smooth tween
      // layered on top of this easing, compounding into visible lag.
      window.scrollTo({ top: startY + distance * eased, left: 0, behavior: 'auto' });

      this.pendingFrameId = progress < 1 ? requestAnimationFrame(step) : undefined;
    };

    this.pendingFrameId = requestAnimationFrame(step);
  }
}
