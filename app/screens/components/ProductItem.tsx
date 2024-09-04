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
import {hitSlop, ScreenWidth} from '../../utils/utils';
import {colors, images} from '../../theme';
import {Text} from '../../components/Text';
import {Product} from '../../slices/home.types';
import {scale} from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  item: Product;
  onPressFavorite: (item: Product) => void;
  onPressAddToCart: (item: Product) => void;
  favoriteList: Product[];
  cartItems: Product[];
};

const ProductItem = ({
  item,
  onPressFavorite,
  onPressAddToCart,
  cartItems,
  favoriteList,
}: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  const isExsist = cartItems.some(itm => itm.id === item.id);
  return (
    <View style={styles.container}>
      <Image
        defaultSource={images.dummyImage}
        style={[styles.image]}
        source={item?.thumbnail ? {uri: item.thumbnail} : images.dummyImage}
      />
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={() => {
          scale.value = withSpring(1.5, {damping: 3, stiffness: 150}, () => {
            scale.value = withTiming(1, {duration: 300});
          });
          onPressFavorite(item);
        }}
        style={styles.favorite}>
        <Animated.Image
          source={
            favoriteList?.indexOf(item) > -1
              ? images.favoriteFilled
              : images.favorite
          }
          style={animatedStyle}
        />
      </TouchableOpacity>
      <View style={styles.priceContainer}>
        <Text preset="bold" text={`$${item.price}`} />
        <TouchableOpacity
          hitSlop={hitSlop}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            onPressAddToCart(item);
          }}>
          <Animated.Image
            source={isExsist ? images.minusFilled : images.plusFilled}
          />
        </TouchableOpacity>
      </View>
      <Text
        numberOfLines={2}
        text={item.title}
        style={{color: colors.palette.textGray}}
      />
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth / 2.2,
    marginTop: scale(10),
    height: 200,
    backgroundColor: colors.palette.itemBackground,
    borderRadius: 10,
    padding: 10,
  } as ViewStyle,

  favorite: {
    position: 'absolute',
    top: 10,
    left: 10,
  } as ImageStyle,

  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  } as ImageStyle,

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  } as ViewStyle,
});
