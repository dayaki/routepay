import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';

const SendMoney = ({ navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Send Money" centered hideBalance />
      <View style={styles.scroll}>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('send_money')}
            style={[styles.box, styles.boxed]}>
            <RegularText
              text="Send to any Routepay wallet"
              style={styles.boxText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}>
            <RegularText text="Send to a bank account" style={styles.boxText} />
          </TouchableOpacity>
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}>
            <RegularText text="Send to a Beneficiary" style={styles.boxText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}>
            <RegularText
              text="Send via Recent Transfers"
              style={styles.boxText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendMoney;
