import {Dimensions} from 'react-native';
import {AppStore} from '../store';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;
export const hitSlop = {left: 15, top: 15, right: 15, bottom: 15};

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T> | void>;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  millisecond: number,
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return async function debounced(
    ...args: Parameters<T>
  ): Promise<void | ReturnType<T>> {
    clearTimeout(timeoutId);

    return new Promise<void | ReturnType<T>>(resolve => {
      timeoutId = setTimeout(async () => {
        resolve(func(...args));
      }, millisecond);
    });
  };
}
