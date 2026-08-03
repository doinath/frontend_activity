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
}
