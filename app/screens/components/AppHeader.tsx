import {Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {Text} from '../../components/Text';
import {images} from '../../theme';
import {scale} from 'react-native-size-matters';
import Animated, {FadeIn, FadeInLeft, FadeOut} from 'react-native-reanimated';
import {navigationRef} from '../../navigators';
import {hitSlop} from '../../utils/utils';

type Props = {
  count: number;
};

const AppHeader = ({count}: Props) => {
  const onBackClick = () => {
    navigationRef.goBack();
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <TouchableOpacity hitSlop={hitSlop} onPress={onBackClick}>
        <Image source={images.back} />
      </TouchableOpacity>
      <Animated.View entering={FadeInLeft} style={styles.textContainer}>
        <Text
          tx={'home.shoppingCart'}
          size="md"
          txOptions={{count: count ?? 0}}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default AppHeader;
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
  textContainer: {
    flex: 1,
    padding: scale(15),
    justifyContent: 'center',
  } as ViewStyle,
});
