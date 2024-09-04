import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, images} from '../theme';

type Props = {
  onPress?: () => void;
};

const SearchBar = ({onPress}: Props) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.container}>
      <Image source={images.search} />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.palette.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
