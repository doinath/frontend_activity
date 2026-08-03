import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingOverlay } from './shared/components/loading-overlay/loading-overlay';

@Component({
  selector: 'nctv-root',
  imports: [RouterOutlet, LoadingOverlay],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
