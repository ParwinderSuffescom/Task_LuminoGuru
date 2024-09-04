import {StyleSheet, ViewStyle} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Screen} from '../components/Screen';
import {colors} from '../theme';
import SearchBar from '../components/SearchBar';
import {connect, ConnectedProps} from 'react-redux';
import {AppStackScreenProps} from './navigators';
import {RootState} from '../store';
import {productListing} from '../slices/home.slice';

type NavigationProps = AppStackScreenProps<'Home'>;
type StoreProps = ConnectedProps<typeof connector>;
type Props = NavigationProps & StoreProps;

const HomeScreen = (props: Props) => {
  useLayoutEffect(() => {
    // props.navigation.setOptions({navigationBarColor: colors.palette.white});
  }, [props.navigation]);

  return (
    <Screen
      backgroundColor={colors.palette.primaryDark}
      preset="auto"
      statusBarStyle="light"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={styles.mainContainer}>
      <SearchBar />
      {/* <View
        style={{
          flex: 1,
          backgroundColor: colors.palette.white,
          height: 100,
        }}></View> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flexGrow: 1} as ViewStyle,
});

const mapStateToProps = (state: RootState) => ({
  productListLoading: state.home.productListLoading,
  productListData: state.home.productListData,
});
const mapDispatch = {
  productListing: (payload: number) => productListing(payload),
};

const connector = connect(mapStateToProps, mapDispatch);
export const Home = connector(HomeScreen);
