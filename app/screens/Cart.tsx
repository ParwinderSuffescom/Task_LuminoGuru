import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Vibration,
  View,
  ViewStyle,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {AppStackScreenProps} from '../navigators';
import {RootState} from '../store';
import {homeActions} from '../slices/home.slice';
import {Product} from '../slices/home.types';
import {Screen} from '../components/Screen';
import AppHeader from './components/AppHeader';
import CartItems from './components/CartItems';
import {colors, images, spacing} from '../theme';
import {Button} from '../components/Button';
import {Text} from '../components/Text';
import {TxKeyPath} from '../i18n';
import {scale} from 'react-native-size-matters';

type NavigationProps = AppStackScreenProps<'Cart'>;
type StoreProps = ConnectedProps<typeof connector>;
type Props = NavigationProps & StoreProps;

const deliveryFee = 10;

const CartScreen = (props: Props) => {
  const [totalPrice, setTotalPrice] = useState<string>('0');
  const [totalItemCount, setTotalItemCount] = useState<number>(0);

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      props.navigation.setOptions({
        navigationBarColor: colors.palette.white,
      });
    }
  }, [props.navigation]);

  useEffect(() => {
    calculatePrice();
    calculateTotalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cartItemList]);

  const calculateTotalCount = useCallback(() => {
    const totalCount = props.cartItemList.reduce((total, item) => {
      return total + (item.count || 1);
    }, 0);
    setTotalItemCount(totalCount);
  }, [props.cartItemList]);

  const calculatePrice = useCallback(() => {
    const total = props.cartItemList.reduce((sum, item) => {
      const itemPrice = item.count ? item.price * item.count : item.price;
      return sum + itemPrice;
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [props.cartItemList]);

  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <CartItems
        item={item}
        onPressMinus={cartItem => {
          Vibration.vibrate(100);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          props.removeItem(cartItem);
        }}
        onPressAdd={cartItem => {
          Vibration.vibrate(100);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          props.addMoreItem(cartItem);
        }}
      />
    ),
    [props],
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyCart}>
        <Image source={images.emptyCart} />
        <Text size="md" tx="cart.yourCartIsEmpty" />
      </View>
    ),
    [],
  );

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.mainContainer}
      renderHeader={<AppHeader count={totalItemCount} />}
      safeAreaEdges={['top', 'bottom']}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.mainContainer}
        data={props.cartItemList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={ListEmptyComponent}
      />
      {props.cartItemList?.length > 0 && (
        <View style={styles.buttonContainer}>
          <RowItem title="cart.subtotal" value={`$${totalPrice}`} />
          <RowItem title="cart.delivery" value={`$${deliveryFee}`} />
          <RowItem
            title="cart.total"
            value={`$${(parseFloat(totalPrice) + deliveryFee).toFixed(2)}`}
          />
          <Button
            style={styles.checkoutButton}
            onPress={() => {
              Vibration.vibrate();
              toast.show('Your order has been created', {type: 'success'});
            }}
            tx="cart.proceedToCheckout"
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flexGrow: 1, paddingHorizontal: 10} as ViewStyle,

  emptyCart: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  buttonContainer: {
    borderRadius: 15,
    backgroundColor: colors.palette.itemBackground,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 5,
    padding: 10,
    marginTop: 5,
  } as ViewStyle,

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  } as ViewStyle,

  list: {
    flex: spacing.one,
  },

  checkoutButton: {
    marginVertical: scale(20),
  },
});

const mapStateToProps = (state: RootState) => ({
  cartItemList: state.home.cartItemList,
});

const mapDispatch = {
  addOrRemoveToCart: (payload: Product) =>
    homeActions.addOrRemoveToCart(payload),
  addMoreItem: (payload: Product) => homeActions.addMoreItem(payload),
  removeItem: (payload: Product) => homeActions.removeItem(payload),
};

const connector = connect(mapStateToProps, mapDispatch);
export const Cart = connector(CartScreen);

const RowItem = memo(({title, value}: {title: TxKeyPath; value: string}) => (
  <View style={styles.row}>
    <Text style={{color: colors.palette.placeHolderColor}} tx={title} />
    <Text text={value} />
  </View>
));
