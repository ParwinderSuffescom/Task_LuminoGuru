import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import * as Screens from '../screens';
import {navigationRef, useBackButtonHandler} from './navigationUtilities';
import {colors} from '../theme';
import {ConnectedProps, connect} from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import {RootState} from '../store';
import BaseConfig from '../config';
import {delay} from '../utils/utils';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Home: undefined;
  Cart: undefined;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = BaseConfig.exitRoutes;
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

type AppStackProps = ConnectedProps<typeof connector>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = (_props: AppStackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.transparent,
      }}>
      <Stack.Screen
        options={{animation: 'fade'}}
        name="Home"
        component={Screens.Home}
      />
      <Stack.Screen name="Cart" component={Screens.Cart} />
    </Stack.Navigator>
  );
};

const mapState = (_state: RootState) => ({});

const connector = connect(mapState);
const App = connector(AppStack);

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  useEffect(() => {
    hideSplash();
  }, []);

  const hideSplash = async () => {
    await delay(2000);
    await BootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer
      // onReady={hideSplash}
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <App />
    </NavigationContainer>
  );
};
