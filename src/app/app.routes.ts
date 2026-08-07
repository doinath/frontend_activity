import { Routes } from '@angular/router';

/**
 * @description Top-level routes. The landing feature is lazy-loaded so the
 * marketing page ships as its own chunk, separate from any future app shell.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy-page').then((m) => m.PrivacyPage),
  },
];
