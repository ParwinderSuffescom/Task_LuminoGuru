import {
  Image,
  ImageStyle,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {hitSlop} from '../../utils/utils';
import {colors, images, spacing} from '../../theme';
import {Text} from '../../components/Text';
import {Product} from '../../slices/home.types';
import {scale} from 'react-native-size-matters';
import Animated from 'react-native-reanimated';

type Props = {
  item: Product;
  onPressMinus: (item: Product) => void;
  onPressAdd: (item: Product) => void;
};

const CartItems = ({item, onPressAdd, onPressMinus}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        defaultSource={images.dummyImage}
        style={[styles.image]}
        source={item?.thumbnail ? {uri: item.thumbnail} : images.dummyImage}
      />
      <View style={styles.textContainer}>
        <Text text={item?.title ?? ''} />
        <Text text={`$${item?.price}`} style={{marginVertical: spacing.xxs}} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            onPressMinus(item);
          }}>
          <Animated.Image source={images.minus} />
        </TouchableOpacity>
        <Text
          text={item?.count?.toString() ?? '1'}
          style={{color: colors.palette.textGray, marginHorizontal: spacing.sm}}
        />
        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            onPressAdd(item);
          }}>
          <Animated.Image source={images.plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.palette.border,
    minHeight: 100,
    padding: 10,
  } as ViewStyle,

  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  } as ViewStyle,

  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  } as ImageStyle,

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  } as ViewStyle,
});
