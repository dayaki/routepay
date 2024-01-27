import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';

const Bills = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Pay Bills" centered />
      <View style={styles.billsWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bill}
          onPress={() => navigation.navigate('cable_tv')}>
          <Image
            source={
              theme === 'dark'
                ? require('@images/bills/cable_dark.png')
                : require('@images/bills/cable.png')
            }
            resizeMode="cover"
            style={styles.billIcon}
          />
          <TitleText text="Cable TV" size={14} style={styles.billTitle} />
          <RegularText
            text="Pay your DSTV, GOTV & other cable subscriptions"
            size={11}
          />
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bill}
          onPress={() => navigation.navigate('electricity')}>
          <Image
            source={
              theme === 'dark'
                ? require('@images/bills/electricity_dark.png')
                : require('@images/bills/electricity.png')
            }
            resizeMode="cover"
            style={styles.billIcon}
          />
          <TitleText text="Electricity" size={14} style={styles.billTitle} />
          <RegularText
            text="Pay your prepaid off & postpaid power bills"
            size={11}
          />
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity activeOpacity={1} style={styles.bill}>
          <Image
            source={
              theme === 'dark'
                ? require('@images/bills/airline_dark.png')
                : require('@images/bills/airline.png')
            }
            resizeMode="cover"
            style={styles.billIcon}
          />
          <TitleText
            text="Airline Tickets"
            size={14}
            style={styles.billTitle}
          />
          <RegularText text="Coming soon..." size={11} />
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity activeOpacity={1} style={styles.bill}>
          <Image
            source={
              theme === 'dark'
                ? require('@images/bills/toll_dark.png')
                : require('@images/bills/toll.png')
            }
            resizeMode="cover"
            style={styles.billIcon}
          />
          <TitleText text="Toll Tickets" size={14} style={styles.billTitle} />
          <RegularText text="Coming soon..." size={11} />
        </TouchableOpacity>
        {/*  */}
      </View>
    </View>
  );
};

export default Bills;
