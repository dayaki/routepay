import React, { useState, useEffect } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Header, Input, Loader, RegularText } from '@common';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { initPaymentFlow, moneyFormat } from '@utils';
import { useStyles } from './styles';
import { OrderPayload } from '@types';
import { useFocusEffect } from '@react-navigation/native';

const WalletTopup = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('leaving screen.....');
        Keyboard.dismiss();
      };
    }, []),
  );

  const handleCustomAmount = (figure: string) => {
    setAmount(figure);
    const formatted = moneyFormat(figure, 0);
    setCustomAmount(formatted);
  };

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
      const payloadd: OrderPayload = {
        orderPayload: {
          payload: { amount: Number(amount.replace(/,/g, '')) },
        },
      };
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
            text="Enter the amount you want to top up your wallet with below. You will then be redirected to make payment."
            size={14}
            style={{ lineHeight: 25, marginBottom: 30 }}
          />
          <Input
            placeholder="Amount"
            label="Amount"
            value={customAmount}
            onChangeText={handleCustomAmount}
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
