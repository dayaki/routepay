import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BackgroundView,
  Keyboard,
  Loader,
  RegularText,
  TitleText,
} from '@common';
import { useLoginStyles } from './auth/styles';

const WalletPIN = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pin, setPin] = useState('');
  const styles = useLoginStyles();

  useEffect(() => {
    if (pin.length === 4) {
      // submit data
      handleSubmit();
      console.log('submut pin', pin);
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

  const handleSubmit = () => {
    setIsLoading(true);
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
