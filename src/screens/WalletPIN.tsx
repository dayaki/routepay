import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BackgroundView,
  Keyboard,
  Loader,
  RegularText,
  TitleText,
} from '@common';
import { apiService, getUuid, postBillPayment, postVerifyPin } from '@utils';
import { useLoginStyles } from './auth/styles';

const WalletPIN = ({ navigation, route }) => {
  const data = route.params.data;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pin, setPin] = useState('');
  const styles = useLoginStyles();

  useEffect(() => {
    if (pin.length === 4) {
      handleSubmit();
    }
  }, [pin]);

  const handleInput = (value: string) => {
    console.log('handleInput', value);
    if (error) {
      setError('');
    }
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    if (pin.length) {
      let pinCode = pin.split('');
      pinCode.pop();
      let newPin = pinCode.join('');
      setPin(newPin);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await apiService(postVerifyPin(pin), 'post', {});
      console.log('Verify PIN', response);
      chargePayment();
    } catch (err) {
      console.log('Verify PIN ERR', err);
    }
  };

  const chargePayment = async () => {
    try {
      const response = await apiService(postBillPayment, 'post', {
        billCode: data.selectedNetwork.billCode,
        merchantReference: getUuid(),
        payload: {
          mobileNumber: data.phone,
          amount: data.amount,
        },
      });
      console.log('chargePayment', response);
    } catch (err) {
      console.log('chargePayment ERR', err);
    }
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="Enter your wallet pin" />
          <RegularText
            size={14}
            text="Use your wallet pin to confirm transactions"
            style={styles.otpLabel}
          />
          <View style={styles.indicator}>
            <View style={styles.pinDot} />
            <View style={styles.pinDot} />
            <View style={styles.pinDot} />
            <View style={styles.pinDot} />
          </View>
          <Keyboard handleInput={handleInput} handleDelete={handleDelete} />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.forgotPinBtn}
          onPress={() => navigation.navigate('transaction_success')}>
          <TitleText
            text="Forgot Pin?"
            size={14}
            style={styles.forgotPinBtnText}
          />
        </TouchableOpacity>
        {/* <Button
          textLink
          textOnly
          textStyle={{ color: '#FF6600' }}
          text="Forgot Pin?"
          onPress={() => navigation.navigate('welcome')}
        /> */}
      </View>
    </BackgroundView>
  );
};
export default WalletPIN;
