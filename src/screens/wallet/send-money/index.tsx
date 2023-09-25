import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header, MediumText, RegularText } from '@common';
import { useAppSelector } from '@store';
import { useStyles } from '../styles';

const SendMoney = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Send Money" centered hideBalance />
      <View style={styles.content}>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            //onPress={() => navigation.navigate('send_routepay')}
            style={[styles.box, styles.boxed]}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/routepay_dark.png')
                  : require('@images/wallet/routepay.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <RegularText
              text="Send to Routepay wallet"
              style={styles.boxText}
            />
            <MediumText text="Coming soon." style={styles.fineText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            onPress={() => navigation.navigate('send_bank')}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/bank_dark.png')
                  : require('@images/wallet/bank.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <RegularText text="Send to a bank account" style={styles.boxText} />
            {/* <MediumText text="Coming soon." style={styles.fineText} /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            // onPress={() => navigation.navigate('send_beneficiary')}
          >
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/up_dark.png')
                  : require('@images/wallet/up.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <RegularText text="Send to a Beneficiary" style={styles.boxText} />
            <MediumText text="Coming soon." style={styles.fineText} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            // onPress={() =>
            //   navigation.navigate('send_beneficiary', { type: 'recent' })
            // }
          >
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/up_dark.png')
                  : require('@images/wallet/up.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <RegularText text="Use Recent Transfers" style={styles.boxText} />
            <MediumText text="Coming soon." style={styles.fineText} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendMoney;
