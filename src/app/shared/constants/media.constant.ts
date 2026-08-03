/**
 * @description Brand image sources.
 *
 * These currently point at the Figma-hosted exports of your uploaded
 * `nctv_logo.svg` / `compass.svg` (same artwork — dimensions match exactly:
 * 376x67, 235x42, and 354x354). They're a stand-in because the two files you
 * attached are Figma "image fill" exports — an SVG wrapper around a very
 * large embedded raster — too large to move into this project without shell
 * access, which isn't available in this session.
 *
 * These Figma CDN links expire ~7 days after export. Before shipping, replace
 * the three constants below with local paths (e.g. `assets/images/logo-full.png`)
 * once the files are copied into `src/assets/images/`.
 */
export const LOGO_FULL_SRC = 'https://www.figma.com/api/mcp/asset/980e7f4f-ce82-4278-80ae-f550d01d2878';
export const LOGO_COMPACT_SRC = 'https://www.figma.com/api/mcp/asset/0b078a88-c302-4dd2-8f28-a51381ba3e08';
export const HERO_COMPASS_SRC = 'https://www.figma.com/api/mcp/asset/e23fc5fe-ff08-464f-aa3f-eb9c8f5f6bea';
