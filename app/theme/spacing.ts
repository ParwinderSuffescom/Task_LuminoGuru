/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  spacing10: 10,
  spacing15: 15,
  spacing16: 16,
  spacing17: 17,
  spacing18: 18,
  spacing14: 14,
  spacing20: 20,
  spacing30: 30,
  spacing40: 40,
  spacing100: 100,
  md: 16,
  nrml: 18,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  zero: 0,
  one: 1,
  half: 0.5,
} as const;

export type Spacing = keyof typeof spacing;
