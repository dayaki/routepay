import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  BackgroundView,
  Button,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { useLoginStyles } from './styles';
import { AuthNavigationProps } from '@types';

const EmailVerification = ({ navigation, route }: AuthNavigationProps) => {
  const { type, data } = route.params;
  const styles = useLoginStyles();

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText
            text={type === 'email' ? 'Verify your email' : 'OTP Verification'}
          />
          <RegularText
            size={14}
            text={`Enter the 6-digit code sent to your ${
              type === 'email' ? 'email address' : 'mobile number'
            }`}
            style={styles.otpLabel}
          />
          <OTPInput />
        </View>
        <Button
          text="Continue"
          onPress={() => navigation.navigate('welcome')}
        />
      </View>
    </BackgroundView>
  );
};
export default EmailVerification;
