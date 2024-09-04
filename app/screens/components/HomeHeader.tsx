import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {Text} from '../../components/Text';
import {colors, images} from '../../theme';
import {translate} from '../../i18n';
import {scale} from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
  FadeInLeft,
  FadeInRight,
  FadeOut,
} from 'react-native-reanimated';
import {hitSlop} from '../../utils/utils';

type Props = {
  count: number;
  onPressCart: () => void;
};

const HomeHeader = ({count, onPressCart}: Props) => {
  return (
    <Animated.View exiting={FadeOut} style={styles.container}>
      <Animated.View entering={FadeInLeft} style={styles.textContainer}>
        <Text preset="invert" text={`${translate('home.heyUser')}`} />
      </Animated.View>
      <CartIcon count={count} onPressCart={onPressCart} />
    </Animated.View>
  );
};

export default HomeHeader;
const CIRCLE_SIZE = scale(20);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: scale(10),
  } as ViewStyle,

  cartContainer: {
    position: 'absolute',
    top: scale(-10),
    right: scale(-10),
  } as ViewStyle,

  textContainer: {
    flex: 1,
    padding: scale(15),
    justifyContent: 'center',
  } as ViewStyle,

  cartCountContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.palette.cartCountColor,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.palette.primary,
  },
});

const CartIcon = memo(
  ({count, onPressCart}: {count: number; onPressCart: () => void}) => {
    const scaleValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scaleValue.value}],
      };
    });

    React.useEffect(() => {
      // Pulse effect on cart value change
      scaleValue.value = withSequence(
        withTiming(1.5, {duration: 150, easing: Easing.ease}), // Scale up slightly
        withTiming(1, {duration: 150, easing: Easing.ease}), // Scale back to original size
      );
    }, [count, scaleValue]);

    return (
      <Animated.View entering={FadeInRight}>
        <TouchableOpacity hitSlop={hitSlop} onPress={onPressCart}>
          <Image source={images.bag} />
        </TouchableOpacity>
        {count > 0 ? (
          <Animated.View style={[animatedStyle, styles.cartContainer]}>
            <Pressable style={styles.cartCountContainer} onPress={onPressCart}>
              <Text preset="invert" size="xxxs" text={count?.toString()} />
            </Pressable>
          </Animated.View>
        ) : null}
      </Animated.View>
    );
  },
);
