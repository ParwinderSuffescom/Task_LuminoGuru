const palette = {
  primary: '#2A4BA0',
  primaryDark: '#153075',
  itemBackground: '#F8F9FB',
  black: '#000000',
  white: '#FFFFFF',
  cartCountColor: '#F9B023',
  placeHolderColor: '#8891A5',
  border: '#EBEBFB',

  // Toast Colors
  success: '#00C851',
  info: '#33b5e5',
  warning: '#FFD54F',
  danger: '#d9534f',
  inverse: '#292b2c',
  faded: '#f7f7f7',

  // textDarkSecondary
  textDark: '#1E222B',
  textGray: '#616A7D',
  textDim: '#F8F9FB',
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  halfTransparent: 'rgba(0, 0, 0, 0.8)',
  semiTransparent: 'rgba(0, 0, 0, 0.5)',
  /**
   * The default text color in many components.
   */
  text: palette.textDark,
  /**
   * Secondary text information.
   */
  textDim: palette.textDim,
  /**
   * The default color of the screen background.
   */
  background: palette.white,
  /**
   * The default border color.
   */
  border: palette.itemBackground,

  /**
   * A subtle color used for lines.
   */
  separator: palette.itemBackground,
  /**
   * Error messages.
   */
  error: palette.danger,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.danger,
};
