export type PodcastPlatform = 'spotify' | 'apple';

/** @description An outbound listen link for the podcast section. */
export interface PodcastLink {
  label: string;
  href: string;
  platform: PodcastPlatform;
}
