import { Injectable, signal, WritableSignal } from '@angular/core';

/** How long the loading overlay stays up before the redirect fires, in milliseconds. */
const LOADING_DURATION_MS = 500;

/**
 * @description Shows the full-screen compass loading overlay for a beat,
 * then hands off to an external URL. Used for outbound links (Spotify,
 * LinkedIn, etc.) that should feel like a deliberate transition rather than
 * an instant tab jump.
 */
@Injectable({ providedIn: 'root' })
export class NavigationLoaderService {
  private readonly _isLoading: WritableSignal<boolean> = signal<boolean>(false);

  public readonly isLoading = this._isLoading.asReadonly();

  /**
   * @description Registers a `pageshow` listener so a stuck overlay clears
   * itself if the browser restores this page from the back/forward cache
   * mid-redirect (e.g. the user hits Back before the external site loads).
   */
  constructor() {
    window.addEventListener('pageshow', (event: PageTransitionEvent) => {
      if (event.persisted) {
        this._isLoading.set(false);
      }
    });
  }

  /**
   * @description Displays the loading overlay, then navigates the browser
   * to `url` once the delay elapses.
   * @param url Absolute URL to redirect to after the loading beat, or an
   * in-page hash (e.g. `#model`) to jump to a section on this same page.
   */
  public redirectWithLoading(url: string): void {
    this._isLoading.set(true);

    setTimeout(() => {
      window.location.href = url;

      // An external redirect unloads this app entirely, so the overlay
      // disappears with it. An in-page hash jump does NOT unload/reload —
      // nothing else would ever flip `_isLoading` back off, so the overlay
      // would stay stuck forever. Clear it explicitly for that case; it's a
      // harmless no-op for the external-redirect case since the page is
      // already gone by the time this line would matter.
      this._isLoading.set(false);
    }, LOADING_DURATION_MS);
  }
}
