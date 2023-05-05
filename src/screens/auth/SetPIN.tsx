import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  BackgroundView,
  Button,
  Keyboard,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { useLoginStyles } from './styles';

const SetPIN = ({ navigation }) => {
  const [error, setError] = useState('');
  const [pin, setPin] = useState('');
  const styles = useLoginStyles();

  useEffect(() => {
    if (pin.length === 4) {
      // submit data
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

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="Set up your wallet pin" />
          <RegularText
            size={14}
            text="Create your wallet pin to securely confirm your transactions"
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
        <Button
          text="Continue"
          onPress={() => navigation.navigate('welcome')}
        />
      </View>
    </BackgroundView>
  );
};
export default SetPIN;
