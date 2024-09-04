import React, {ComponentType, useState} from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {Text, TextProps} from './Text';
import {scale} from 'react-native-size-matters';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps['tx'];
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps['txOptions'];
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * Children components.
   */
  children?: React.ReactNode;

  rounded?: boolean;
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    rounded,
    ...rest
  } = props;

  const [scale] = useState(new Animated.Value(1));

  const preset: Presets = $viewPresets[props.preset ?? 'default']
    ? props.preset ?? 'default'
    : 'default';

  const $viewStyle = [
    $viewPresets[preset],
    $viewStyleOverride,
    rounded && $rounded,
  ];

  function $textStyle() {
    return [$textPresets[preset], $textStyleOverride];
  }

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PressableAnimated
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[$viewStyle, {transform: [{scale}]}]}
      accessibilityRole="button"
      {...rest}>
      {state => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />
          )}

          <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle()}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
            />
          )}
        </>
      )}
    </PressableAnimated>
  );
}

const $baseViewStyle: ViewStyle = {
  minHeight: scale(50),
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: 'hidden',
};

const $rounded: ViewStyle = {
  borderRadius: scale(30),
};

const $baseTextStyle: TextStyle = {
  fontSize: 17,
  lineHeight: 20,
  fontFamily: typography.primary.semibold,
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.palette.white,
};

const $rightAccessoryStyle: ViewStyle = {marginStart: spacing.xs, zIndex: 1};
const $leftAccessoryStyle: ViewStyle = {marginEnd: spacing.xs, zIndex: 1};

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      backgroundColor: colors.palette.primary,
    },
  ] as StyleProp<ViewStyle>,

  outline: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent,
      borderWidth: 1,
      borderColor: colors.palette.black,
    },
  ] as StyleProp<ViewStyle>,

  danger: [
    $baseViewStyle,
    {backgroundColor: colors.error},
  ] as StyleProp<ViewStyle>,

  light: [
    $baseViewStyle,
    {backgroundColor: colors.palette.white},
  ] as StyleProp<ViewStyle>,

  invisible: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent,
      borderWidth: 1,
      borderColor: colors.transparent,
    },
  ] as StyleProp<ViewStyle>,
};

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  outline: [$baseTextStyle, {color: colors.palette.black}],
  danger: $baseTextStyle,
  invisible: [$baseTextStyle, {color: colors.transparent}],
  light: $baseTextStyle,
};
