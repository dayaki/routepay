import React from 'react';
import { Image, TouchableOpacity, View, useColorScheme } from 'react-native';
import { TitleText } from '@common';
import { useStyles } from './styles';
import { MenuRightArrow } from '@icons';
import { Header } from './utils';

const NAV_ITEMS = [
  {
    name: 'Buy Airtime',
    icon: require('@images/payments/airtime.png'),
    darkIcon: require('@images/payments/airtime_dark.png'),
    link: 'buy_airtime',
  },
  {
    name: 'Buy Data',
    icon: require('@images/payments/data.png'),
    darkIcon: require('@images/payments/data_dark.png'),
    link: 'buy_data',
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
    link: 'buy_pins',
  },
  {
    name: 'Pay Bills',
    icon: require('@images/payments/bills.png'),
    darkIcon: require('@images/payments/bills_dark.png'),
    link: 'buy_bills',
  },
];

const Payments = ({ navigation }) => {
  const styles = useStyles();
  const scheme = useColorScheme();
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
                source={scheme === 'dark' ? item.darkIcon : item.icon}
                resizeMode="cover"
                style={styles.icon}
              />
              <TitleText text={item.name} size={14} />
            </View>
            <MenuRightArrow />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Payments;
