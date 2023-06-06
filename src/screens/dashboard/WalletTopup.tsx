import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Loader, RegularText } from '@common';
import { newOrder, updateOrder, useAppDispatch, useAppSelector } from '@store';
import { apiService, initPaymentFlow, postWalletTopup } from '@utils';
import { useStyles } from './styles';

const WalletTopup = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const payload = {
        totalAmount: amount,
        customer: {
          email: user?.email,
          mobile: user?.phoneNumber,
          firstname: user?.firstName,
          lastname: user?.lastName,
          username: user?.userName,
        },
      };
      const resp = await initPaymentFlow(payload);
      const payloadd = { amount };
      dispatch(newOrder(payloadd));
      console.log('WalletTopup', resp);
      navigation.navigate('browser', {
        params: {
          uri: resp.redirectUrl,
          merchantReference: resp.merchantReference,
          reference: resp.transactionReference,
          access_token: resp.access_token,
          type: 'wallet',
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log('WalletTopup ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.contain}>
      <Loader show={isLoading} />
      <Header title="Wallet Topup" centered />
      <View style={styles.content}>
        <View>
          <RegularText
            text="Enter the amount you want top up your wallet with below and you will be redirected to make payment."
            size={14}
            style={{ lineHeight: 25, marginBottom: 30 }}
          />
          <Input
            placeholder="Amount"
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </View>

        <Button
          text="Continue to payment"
          onPress={handlePayment}
          isLoading={isLoading}
          disabled={!amount}
        />
      </View>
    </View>
  );
};

export default WalletTopup;
