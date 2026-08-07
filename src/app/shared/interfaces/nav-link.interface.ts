/** Icon rendered in the floating section-nav rail dot for a given link. */
export type NavIconKey = 'home' | 'model' | 'services' | 'podcast' | 'contact';

/** @description A single link used by the section nav rail and the footer nav. */
export interface NavLink {
  label: string;
  path: string;
  icon: NavIconKey;
}
