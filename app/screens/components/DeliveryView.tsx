import React, {memo} from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from '../../components/Text';
import {TxKeyPath} from '../../i18n';
import {colors, images} from '../../theme';
import {scale} from 'react-native-size-matters';

const DeliveryView = () => {
  return (
    <View style={styles.container}>
      <DropDownView heading="home.deliveryTo" value="Green Way 3000, Shlhet" />
      <DropDownView heading="home.withIn" value="1 Hour" />
    </View>
  );
};

export default DeliveryView;

const DropDownView = memo(
  ({heading, value}: {heading: TxKeyPath; value: string}) => (
    <View style={styles.dropdownContainer}>
      <Text size="xxs" style={styles.heading} tx={heading} />
      <View style={styles.row}>
        <Text preset="invert" text={value} style={styles.valueText} />
        <Image source={images.down} />
      </View>
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(5),
  } as ViewStyle,

  heading: {
    color: colors.palette.placeHolderColor,
    fontWeight: 'bold',
    marginVertical: 5,
  } as TextStyle,

  dropdownContainer: {
    flexDirection: 'column',
  } as ViewStyle,

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  valueText: {
    marginRight: 10,
  } as TextStyle,
});
