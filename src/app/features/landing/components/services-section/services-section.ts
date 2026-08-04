import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EyebrowBadge } from '../../../../shared/components/eyebrow-badge/eyebrow-badge';
import { ServiceCategory } from '../../../../shared/interfaces/service-category.interface';
import { SERVICE_CATEGORIES } from '../../constants/service-categories.constant';

/** @description "03 Services" frame: agency capabilities grouped into cards. */
@Component({
  selector: 'nctv-services-section',
  imports: [EyebrowBadge],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  protected readonly categories: ServiceCategory[] = SERVICE_CATEGORIES;

  /**
   * @description Formats a zero-based card index as a zero-padded label
   * (e.g. `0` → `"01"`) for the small numbered marker on each service card.
   * @param zeroBasedIndex The `$index` from the services `@for` loop.
   * @returns The 1-based, zero-padded index string.
   */
  protected formatIndex(zeroBasedIndex: number): string {
    return String(zeroBasedIndex + 1).padStart(2, '0');
  }
}
