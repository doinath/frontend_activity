import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Stat } from '../../interfaces/stat.interface';

export type StatCardVariant = 'inline' | 'card' | 'badge';

/**
 * @description Renders one metric, animating its numeric value counting up
 * from 0 once the card scrolls into view. `inline` variant is used in the
 * hero row (no background), `card` variant is used in the "Our journey" 2x2
 * grid, `badge` is the compact horizontal layout used in the floating photo
 * badge on "Our Model".
 */
@Component({
  selector: 'nctv-stat-card',
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard implements OnInit, OnDestroy {
  public stat: InputSignal<Stat> = input.required<Stat>();
  public variant: InputSignal<StatCardVariant> = input<StatCardVariant>('card');

  /** Value currently shown in the template while the count-up animation runs. */
  protected readonly displayValue: WritableSignal<string> = signal('0');

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private intersectionObserver: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;

  /**
   * @description Watches the host element and starts the count-up animation
   * the first time it scrolls into view. Runs regardless of the
   * prefers-reduced-motion setting — this is a value counting up, not a
   * continuous/decorative motion effect, so it stays on for everyone.
   */
  public ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.animateValue();
          this.intersectionObserver?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  /**
   * @description Tears down the observer and cancels any in-flight animation
   * frame so nothing keeps running after the component is destroyed.
   */
  public ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * @description Animates `displayValue` from 0 up to the stat's numeric
   * value over ~1.2s on an ease-out curve, preserving the original string's
   * thousands separators and trailing suffix (e.g. "4,000+", "250+").
   */
  private animateValue(): void {
    const raw = this.stat().value;
    const target = Number(raw.replace(/[^\d]/g, ''));
    const usesThousandsSeparator = raw.includes(',');
    const suffix = raw.replace(/^[\d,]*/, '');

    if (!Number.isFinite(target) || target === 0) {
      this.displayValue.set(raw);
      return;
    }

    const durationMs = 1200;
    const startTime = performance.now();

    const step = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      const formatted = usesThousandsSeparator ? current.toLocaleString('en-US') : String(current);
      this.displayValue.set(formatted + suffix);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      } else {
        this.displayValue.set(raw);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
