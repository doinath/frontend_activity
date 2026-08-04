import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { NavigationLoaderService } from '../../../core/services/navigation-loader.service';

/**
 * @description Full-screen overlay with a spinning compass, shown while
 * `NavigationLoaderService` is handing off to an external link. Mounted once
 * at the app shell so any feature can trigger it through the service.
 */
@Component({
  selector: 'nctv-loading-overlay',
  imports: [],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlay {
  private readonly navigationLoader = inject(NavigationLoaderService);

  protected readonly isLoading: Signal<boolean> = this.navigationLoader.isLoading;
}
