import {
  ActivityIndicator,
  FlatList,
  Image,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextStyle,
  Vibration,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {colors, images} from '../theme';
import SearchBar from '../components/SearchBar';
import {connect, ConnectedProps} from 'react-redux';
import {AppStackScreenProps} from '../navigators';
import {RootState} from '../store';
import {homeActions, productListing} from '../slices/home.slice';
import HomeHeader from './components/HomeHeader';
import ProductItem from './components/ProductItem';
import {getProductPayload, Product} from '../slices/home.types';
import {Text} from '../components/Text';
import {scale} from 'react-native-size-matters';
import DeliveryView from './components/DeliveryView';

type NavigationProps = AppStackScreenProps<'Home'>;
type StoreProps = ConnectedProps<typeof connector>;
type Props = NavigationProps & StoreProps;

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction;
};

const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const lastCall = React.useRef<number>(0);

  const throttledFunction = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  );

  return throttledFunction;
};

const HomeScreen = (props: Props) => {
  const flatlistRef = useRef<FlatList>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const [hideCartView, setHideCartView] = useState<boolean>(false);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const debouncedSearch = useDebounce((text: string) => {
    setSkip(0);
    getProducts(0, text);
  }, 500);

  const getProducts = (SKIP: number = skip, search: string = searchText) => {
    props.productListing({search, skip: SKIP});
  };

  useEffect(() => {
    calculateTotalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cartItemList]);

  const calculateTotalCount = useCallback(() => {
    const totalCount = props.cartItemList.reduce((total, item) => {
      return total + (item.count || 1);
    }, 0);
    setTotalItemCount(totalCount);
  }, [props.cartItemList]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const onRefresh = useCallback(() => {
    setSkip(0);
    getProducts(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEndReached = useCallback(() => {
    if (
      props.productListLoading !== 'loading' &&
      props.productListData.products.length < props.productListData.total
    ) {
      setSkip(prev => prev + 10);
    }
  }, [props.productListLoading, props.productListData]);

  const onScroll = useThrottle(event => {
    const {y} = event.nativeEvent.contentOffset;
    const buffer = 10;
    if (y > 150 + buffer) {
      if (!hideCartView) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setHideCartView(true);
      }
    } else if (y < 150 - buffer) {
      if (hideCartView) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setHideCartView(false);
      }
    }
  }, 100);

  const ListHeaderComponent = useMemo(
    () => (
      <Text
        tx={searchText?.length ? 'home.searchedProducts' : 'home.recommended'}
        size="xxl"
        style={styles.recommendedText}
      />
    ),
    [searchText?.length],
  );

  const ListEmptyComponent = useCallback(
    () =>
      props.productListLoading === 'loading' ? null : (
        <View style={styles.emptyData}>
          <Image source={images.noData} />
          <Text size="md" tx="cart.noDataAvailable" />
        </View>
      ),
    [props.productListLoading],
  );

  const ListFooterComponent = useMemo(
    () =>
      props.productListLoading === 'loading' ? (
        <View style={styles.footerLoading}>
          <ActivityIndicator color={colors.palette.primary} />
          <Text
            tx="home.loading"
            preset="bold600"
            style={styles.recommendedText}
          />
        </View>
      ) : null,
    [props.productListLoading],
  );

  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductItem
        item={item}
        onPressFavorite={props.addOrRemoveFavorite}
        onPressAddToCart={cartItem => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          // setHideCartView(false);
          Vibration.vibrate(100);
          props.addOrRemoveToCart(cartItem);
        }}
        favoriteList={props.favoriteList}
        cartItems={props.cartItemList}
      />
    ),
    [props],
  );

  const onPressCart = () => {
    props.navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.palette.primary}
      />
      <SafeAreaView style={{backgroundColor: colors.palette.primary}} />

      <View style={styles.headerContainer}>
        {hideCartView || searchText?.length ? null : (
          <HomeHeader onPressCart={onPressCart} count={totalItemCount} />
        )}
        <SearchBar
          onChangeText={text => {
            setSearchText(text);
            debouncedSearch(text);
          }}
          value={searchText}
        />
        {hideCartView || searchText?.length ? null : <DeliveryView />}
      </View>
      <FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        columnWrapperStyle={
          props.productListData?.products?.length > 1
            ? styles.productList
            : styles.productListForSingle
        }
        contentContainerStyle={styles.productListContainer}
        numColumns={2}
        onRefresh={onRefresh}
        refreshing={props.productListLoading === 'loading'}
        onEndReached={onEndReached}
        data={props.productListData?.products ?? []}
        renderItem={renderItem}
        keyExtractor={item => item?.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 10,
    backgroundColor: colors.palette.primary,
  } as ViewStyle,

  emptyData: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  footerLoading: {alignSelf: 'center', marginVertical: 20} as ViewStyle,

  container: {
    flex: 1,
    backgroundColor: colors.palette.white,
  } as ViewStyle,

  productListContainer: {
    paddingBottom: scale(90),
  } as ViewStyle,

  recommendedText: {
    margin: 10,
  } as TextStyle,

  productList: {
    justifyContent: 'space-evenly',
  } as ViewStyle,

  productListForSingle: {marginLeft: scale(10)} as ViewStyle,
});

const mapStateToProps = (state: RootState) => ({
  productListLoading: state.home.productListLoading,
  productListData: state.home.productListData,
  favoriteList: state.home.favoriteList,
  cartItemList: state.home.cartItemList,
});
const mapDispatch = {
  productListing: (payload: getProductPayload) => productListing(payload),
  addOrRemoveFavorite: (payload: Product) =>
    homeActions.addOrRemoveFavorite(payload),
  addOrRemoveToCart: (payload: Product) =>
    homeActions.addOrRemoveToCart(payload),
};

const connector = connect(mapStateToProps, mapDispatch);
export const Home = connector(HomeScreen);
