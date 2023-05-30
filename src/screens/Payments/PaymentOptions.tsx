import React, { useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { Button, Checkbox, Header } from '@common';
import { useStyles } from './styles';
import { apiService, getUuid, postInitPayment } from '@utils';
import { useAppSelector } from '@store';

const { PAYMENT_CLIENT_ID } = Config;

const PaymentOptions = ({ navigation, route }) => {
  const { user } = useAppSelector(state => state.user);
  const { data = {} } = route.params;
  const [selectionOption, setSelectionOption] = useState('wallet');
  const styles = useStyles();

  const onContinue = async () => {
    if (selectionOption === 'card') {
      apiService(postInitPayment, 'post', {
        merchantId: 'yMesQUqwMDFebeb',
        returnUrl: 'https://callback.routepay.com/return',
        merchantReference: getUuid(),
        totalAmount: data.amount,
        currency: 'NGN',
        customer: {
          email: user?.email,
          mobile: user?.phoneNumber,
          firstname: user?.firstName,
          lastname: user?.lastName,
          username: user?.userName,
        },
      })
        .then(result => {
          console.log('postInitPayment', result);
        })
        .catch(err => {
          console.log('postInitPayment ERR', err);
        });
    } else {
      navigation.navigate('wallet_pin', { data });
    }
  };
  return (
    <View style={styles.container}>
      <Header title="Payment Options" centered hideBalance />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Pay with wallet"
              isChecked={selectionOption === 'wallet'}
              onPress={() => setSelectionOption('wallet')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Pay with card"
              isChecked={selectionOption === 'card'}
              onPress={() => setSelectionOption('card')}
            />
          </View>
        </View>
        <View>
          <Button text="Continue payment" onPress={onContinue} />
        </View>
      </View>
    </View>
  );
};

export default PaymentOptions;
