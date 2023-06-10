import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header, Loader } from '@common';
import { initPaymentFlow } from '@utils';
import { useAppSelector } from '@store';
import { useStyles } from './styles';

const PaymentOptions = ({ navigation, route }) => {
  const { user } = useAppSelector(state => state.user);
  const { data = {}, type = '' } = route.params;
  const [selectionOption, setSelectionOption] = useState('wallet');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const onContinue = async () => {
    if (selectionOption === 'card') {
      setIsLoading(true);
      const payload = {
        totalAmount: data.amount,
        customer: {
          email: user?.email,
          mobile: user?.phoneNumber,
          firstname: user?.firstName,
          lastname: user?.lastName,
          username: user?.userName,
        },
      };
      const resp = await initPaymentFlow(payload);
      setIsLoading(false);
      navigation.navigate('browser', {
        params: {
          uri: resp.redirectUrl,
          merchantReference: resp.merchantReference,
          reference: resp.transactionReference,
          access_token: resp.access_token,
          type,
        },
      });
    } else {
      navigation.navigate('wallet_pin');
    }
  };
  return (
    <View style={styles.container}>
      <Loader show={isLoading} />
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
          <Button
            text="Continue payment"
            onPress={onContinue}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentOptions;
