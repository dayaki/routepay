import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header, RegularText } from '@common';
import { useStyles } from './styles';
import { MenuRightArrow } from '@icons';
import { useAppSelector } from '@store';

const NAV_ITEMS = [
  {
    name: 'Buy Airtime',
    icon: require('@images/payments/airtime.png'),
    darkIcon: require('@images/payments/airtime_dark.png'),
    link: 'airtime',
  },
  {
    name: 'Buy Data',
    icon: require('@images/payments/data.png'),
    darkIcon: require('@images/payments/data_dark.png'),
    link: 'data',
  },
  {
    name: 'Buy Fuel',
    icon: require('@images/payments/fuel.png'),
    darkIcon: require('@images/payments/fuel_dark.png'),
    link: 'buy_fuel',
  },
  {
    name: 'Buy Pins',
    icon: require('@images/payments/pins.png'),
    darkIcon: require('@images/payments/pins_dark.png'),
    link: 'pins_landing',
  },
  {
    name: 'Scan to Pay',
    icon: require('@images/payments/scan.png'),
    darkIcon: require('@images/payments/scan_dark.png'),
    link: 'scan_landing',
  },
  {
    name: 'Pay Bills',
    icon: require('@images/payments/bills.png'),
    darkIcon: require('@images/payments/bills_dark.png'),
    link: 'bills',
  },
];

const Payments = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Payments" />
      <View style={styles.menuList}>
        {NAV_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={styles.listBtn}
            onPress={() => navigation.navigate(item.link)}>
            <View style={styles.row}>
              <Image
                source={theme === 'dark' ? item.darkIcon : item.icon}
                resizeMode="cover"
                style={styles.icon}
              />
              <RegularText text={item.name} size={14} />
            </View>
            <MenuRightArrow />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Payments;
