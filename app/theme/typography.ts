// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

const fonts = {
  primary: {
    bold: 'Manrope Bold',
    semibold: 'Manrope SemiBold',
    regular: 'Manrope Regular',
    medium: 'Manrope Medium',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.primary,
};
