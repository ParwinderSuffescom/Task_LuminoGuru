import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  ViewStyle,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {store} from './store';
import {toastProps} from './utils/toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {delay} from './utils/utils';

// Disable font scaling
interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      await delay(2000);
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <ToastProvider {...toastProps}>
          <GestureHandlerRootView style={styles.gestureHandlerRootView}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
          <Toast {...toastProps} />
        </ToastProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  } as ViewStyle,
});
