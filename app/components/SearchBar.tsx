import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef} from 'react';
import {colors, images} from '../theme';
import {TextField} from './TextField';
import Animated from 'react-native-reanimated';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({value, onChangeText}: Props) => {
  const textFieldRef = useRef<TextInput>(null);
  const onPressFocus = () => {
    textFieldRef.current?.focus();
  };

  return (
    <Animated.View>
      <Pressable onPress={onPressFocus} style={styles.container}>
        <Image source={images.search} />
        <View style={styles.textContainer}>
          <TextField
            ref={textFieldRef}
            selectionColor={colors.palette.textDim}
            cursorColor={colors.palette.textDim}
            value={value}
            onChangeText={onChangeText}
            placeholderTx="home.searchPlaceholder"
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.palette.primaryDark,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: '90%',
  } as ViewStyle,
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  } as ViewStyle,
});
