/**
 * Toss design system color tokens, mirrored as plain JS constants so that
 * inline styles ported from the design bundle can keep their literal values.
 * For Tailwind utilities prefer the CSS variables defined in `src/index.css`
 * (e.g. `bg-brand`, `text-gray-600`).
 */
export const tokens = {
  // Brand
  brand: '#3182F6',
  brandPressed: '#2365CF',
  brandStrong: '#007FF3',
  brandWeak: '#E8F2FE',

  // Neutrals
  gray50: '#F9FAFB',
  gray100: '#F2F4F6',
  gray150: '#ECECEC',
  gray200: '#E5E8EB',
  gray300: '#B0B8C1',
  gray400: '#8B95A1',
  gray500: '#6B7683',
  gray600: '#4E5968',
  gray700: '#333D4B',
  gray800: '#2E3D51',
  gray900: '#191F28',

  // Semantic
  success: '#007B33',
  danger: '#EF4452',
  warning: '#FF9000',
  attention: '#FFC84D',
  amber: '#F59E0B',

  // Illustration palette
  cream: '#FFCCA8',
  orangeWarm: '#FFB582',
  brownEarth: '#6E4944',

  // Foreground (alpha on white)
  fgDefault: 'rgba(0, 12, 30, 0.80)',
  fgSecondary: 'rgba(0, 19, 43, 0.58)',
  fgTertiary: 'rgba(0, 25, 54, 0.31)',
  fgOnFill: 'rgba(3, 18, 40, 0.70)',
  fillNeutralWeak: 'rgba(7, 25, 76, 0.05)',
  fillNeutral: 'rgba(7, 25, 76, 0.08)',
} as const;

export type ColorToken = keyof typeof tokens;
