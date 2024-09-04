import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  ViewStyle,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {store} from './store';
import {toastProps} from './utils/toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './navigators';

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

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <ToastProvider {...toastProps}>
          <GestureHandlerRootView style={styles.gestureHandlerRootView}>
            <AppNavigator />
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
