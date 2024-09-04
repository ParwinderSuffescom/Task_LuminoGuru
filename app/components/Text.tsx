import i18n from 'i18n-js';
import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  ColorValue,
} from 'react-native';
import {isRTL, translate, TxKeyPath} from '../i18n';
import {colors, spacing, typography} from '../theme';
import {scale} from 'react-native-size-matters';

type Sizes = keyof typeof $sizeStyles;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /*
   * Text Color
   */
  color?: ColorValue | undefined;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const {
    size,
    tx,
    txOptions,
    text,
    children,
    color,
    style: $styleOverride,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const preset: Presets = props.preset ?? 'default';
  const $styles = [
    $rtlStyle,
    $presets[preset],
    size ? $sizeStyles[size] : undefined,
    color ? {color} : undefined,
    $styleOverride,
  ];

  return (
    <RNText style={[$styles]} {...rest}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  xxxl: {fontSize: scale(26)} satisfies TextStyle,
  xxl: {fontSize: scale(24)} satisfies TextStyle,
  xl: {fontSize: scale(22)} satisfies TextStyle,
  lg: {fontSize: scale(20)} satisfies TextStyle,
  md: {fontSize: scale(18)} satisfies TextStyle,
  sm: {fontSize: scale(16)} satisfies TextStyle,
  xs: {fontSize: scale(14)} satisfies TextStyle,
  xxs: {fontSize: scale(12)} satisfies TextStyle,
  xxxs: {fontSize: scale(10)} satisfies TextStyle,
  xxxxs: {fontSize: scale(8)} satisfies TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.xs,
  {fontFamily: typography.primary.regular},
  {color: colors.text},
];

const $presets = {
  default: $baseStyle,
  underline: [
    $baseStyle,
    {
      textDecorationLine: 'underline',
    },
  ] as StyleProp<TextStyle>,
  lightColor: [
    $baseStyle,
    {
      color: colors.palette.textGray,
    },
  ] as StyleProp<TextStyle>,
  bold100: [
    $baseStyle,
    {
      fontWeight: '100',
    },
  ] as StyleProp<TextStyle>,
  bold200: [
    $baseStyle,
    {
      fontWeight: '200',
    },
  ] as StyleProp<TextStyle>,
  bold300: [
    $baseStyle,
    {
      fontWeight: '300',
    },
  ] as StyleProp<TextStyle>,
  bold400: [
    $baseStyle,
    {
      fontWeight: '400',
    },
  ] as StyleProp<TextStyle>,
  bold500: [
    $baseStyle,
    {
      fontWeight: '500',
    },
  ] as StyleProp<TextStyle>,
  bold600: [
    $baseStyle,
    {
      fontWeight: '600',
    },
  ] as StyleProp<TextStyle>,
  bold700: [
    $baseStyle,
    {
      fontWeight: '700',
    },
  ] as StyleProp<TextStyle>,
  bold800: [
    $baseStyle,
    {
      fontWeight: '800',
    },
  ] as StyleProp<TextStyle>,
  bold900: [
    $baseStyle,
    {
      fontWeight: '900',
    },
  ] as StyleProp<TextStyle>,

  bold: [
    $baseStyle,
    {
      fontWeight: 'bold',
      fontFamily: typography.primary.bold,
    },
  ] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    $sizeStyles.xl,
    {fontFamily: typography.fonts.primary.regular},
  ] as StyleProp<TextStyle>,
  authHeading: [
    $baseStyle,
    $sizeStyles.lg,
    {
      fontFamily: typography.fonts.primary.bold,
      textTransform: 'uppercase',
      fontWeight: '900',
      marginTop: scale(10),
    },
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.md,
    {fontFamily: typography.primary.regular, color: colors.palette.black},
  ] as StyleProp<TextStyle>,

  formLabel: [
    $baseStyle,
    $sizeStyles.xs,
    {
      fontFamily: typography.primary.semibold,
      // textTransform: 'capitalize',
      color: colors.palette.black,
      marginBottom: spacing.xs,
    },
  ] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    $sizeStyles.xs,
    {fontFamily: typography.primary.regular},
  ] as StyleProp<TextStyle>,

  smallBold: [
    $baseStyle,
    $sizeStyles.xxs,
    {fontFamily: typography.primary.bold},
  ] as StyleProp<TextStyle>,

  invert: [
    $baseStyle,
    $sizeStyles.xs,
    {fontFamily: typography.primary.regular, color: colors.palette.white},
  ] as StyleProp<TextStyle>,
};

const $rtlStyle: TextStyle = isRTL ? {writingDirection: 'rtl'} : {};
