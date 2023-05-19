import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { RegularText, TitleText, woodsmoke } from '@common';
import { useStyles } from './styles';
import { AirtimeIcon, DataIcon, MenuRightArrow } from '@icons';
import { Header } from './utils';

const Payments = ({ navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Payments" />
      <View style={styles.menuList}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.listBtn}
          onPress={() => navigation.navigate('buy_airtime')}>
          <View style={styles.row}>
            <Image
              source={require('@images/test1.png')}
              resizeMode="cover"
              style={styles.icon}
            />
            <TitleText text="Buy Airtime" size={14} />
          </View>
          <MenuRightArrow />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.listBtn}>
          <View style={styles.row}>
            {/* <View style={styles.icon}>
              <DataIcon size={16} />
            </View> */}
            <Image
              source={require('@images/test1.png')}
              resizeMode="cover"
              style={styles.icon}
            />
            <TitleText text="Buy Data" size={14} />
          </View>
          <MenuRightArrow />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.listBtn}>
          <View style={styles.row}>
            <Image
              source={require('@images/test1.png')}
              resizeMode="cover"
              style={styles.icon}
            />
            <TitleText text="Buy Fuel" size={14} />
          </View>
          <MenuRightArrow />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.listBtn}>
          <View style={styles.row}>
            <Image
              source={require('@images/test1.png')}
              resizeMode="cover"
              style={styles.icon}
            />
            <TitleText text="Buy Pins" size={14} />
          </View>
          <MenuRightArrow />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.listBtn}>
          <View style={styles.row}>
            <Image
              source={require('@images/test1.png')}
              resizeMode="cover"
              style={styles.icon}
            />
            <TitleText text="Pay bills" size={14} />
          </View>
          <MenuRightArrow />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payments;
