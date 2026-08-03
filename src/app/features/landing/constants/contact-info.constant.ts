import { ContactInfo } from '../../../shared/interfaces/contact-info.interface';
import { SocialLink } from '../../../shared/interfaces/social-link.interface';

export const CONTACT_INFO: ContactInfo[] = [
  { label: 'Address', value: 'Suite 100, Lakewood, CO' },
  { label: 'Phone', value: '(720) 555-0142' },
  { label: 'Email', value: 'hello@example.com' },
];

export const CONTACT_SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'icon-facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'icon-instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanaejedd/', icon: 'icon-linkedin' },
];
