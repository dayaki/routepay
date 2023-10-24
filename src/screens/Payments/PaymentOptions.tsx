import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header, Loader } from '@common';
import { initPaymentFlow } from '@utils';
import { updateOrderPayment, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from './styles';

const PaymentOptions = ({ navigation, route }) => {
  const { user, wallet } = useAppSelector(state => state.user);
  const { data = {}, type = '' } = route.params;
  const [selectionOption, setSelectionOption] = useState(
    user?.bvnVerified ? 'wallet' : 'card',
  );
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateOrderPayment({
        paymentMode: 'purse',
      }),
    );
  }, [dispatch]);

  const selectOption = (selected: 'wallet' | 'card') => {
    setSelectionOption(selected);
    dispatch(
      updateOrderPayment({
        paymentMode: selected === 'wallet' ? 'purse' : 'routepay',
      }),
    );
  };

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
      navigation.navigate('wallet_pin', { data, type });
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
              // disabled={
              //   !user?.bvnVerified || wallet.balance < Number(data.amount)
              // }
              isChecked={selectionOption === 'wallet'}
              onPress={() => selectOption('wallet')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Pay with card"
              isChecked={selectionOption === 'card'}
              onPress={() => selectOption('card')}
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
