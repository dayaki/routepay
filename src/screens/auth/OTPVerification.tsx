import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Config from 'react-native-config';
import {
  BackgroundView,
  Button,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { useLoginStyles } from './styles';
import { AuthNavigationProps } from '@types';
import {
  apiService,
  formatPhone,
  postCreateWallet,
  postRegister,
} from '@utils';

const { TERMII_API } = Config;

const OTPVerification = ({ navigation, route }: AuthNavigationProps) => {
  const { payload } = route.params;
  const [otpCode, setOtpCode] = useState('');
  const [codeId, setCodeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const styles = useLoginStyles();

  useEffect(() => {
    if (payload) {
      sendPhoneOTP();
    }
  }, []);

  const sendPhoneOTP = async () => {
    const dataToSend = {
      api_key: TERMII_API,
      message_type: 'NUMERIC',
      pin_type: 'NUMERIC',
      channel: 'generic',
      to: formatPhone(payload.phoneNumber),
      pin_attempts: 3,
      pin_time_to_live: 1,
      pin_length: 6,
      pin_placeholder: '< 1234 >',
      // message_text: 'Hi there, your RoutePay verification code is < 1234 >',
      message_text: 'Hi Ayodeji, your CARVIVA Fuel Wallet code is < 1234 >',
      from: 'CARVIVA',
    };

    try {
      const resp = await fetch('https://api.ng.termii.com/api/sms/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const { pinId } = await resp.json();
      // console.log('sendPhoneOTP', res);
      setCodeId(pinId);
      // {"pinId": "95c6083c-c277-46ac-a93d-3526b70ba285", "smsStatus": "Message Sent", "status": 200, "to": "2347038327370"}
    } catch (error: any) {
      console.log('sendPhoneOTP ERR', error);
      toast.show(error.message, { type: 'warning' });
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://api.ng.termii.com/api/sms/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: TERMII_API,
          pin_id: codeId,
          pin: otpCode,
        }),
      });
      const response = await resp.json();
      const { verified } = response;
      console.log('verifyOtp response', response);
      if (verified === 'Expired') {
        toast.show('Confirmation code has expired!', { type: 'warning' });
        setIsLoading(false);
        return;
      } else if (verified === false) {
        toast.show('Invalid confirmation code.', { type: 'warning' });
        setIsLoading(false);
        return;
      }
      registerUser();
    } catch (error: any) {
      console.log('verifyOtp ERR', error);
      toast.show(error.message, { type: 'warning' });
      setIsLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      const resp = await apiService(postRegister, 'post', payload);
      const { id, message, succeeded } = resp;
      console.log('handleSignup', resp);
      if (succeeded) {
        createWallet(id);
      } else {
        let errorMessage: string = '';
        if (message.includes('Duplicate Email')) {
          errorMessage = 'Your email address is already in use!';
        } else if (
          message.includes('PasswordTooShort,PasswordRequiresNonAlphanumeric')
        ) {
          errorMessage = 'Password requires special characters and uppercase.';
        }
        toast.show(errorMessage, {
          type: 'warning',
        });
        navigation.navigate('signup', { error: errorMessage });
      }
    } catch (error) {
      console.log('handleSignup ERR', error);
      navigation.navigate('signup', {
        error: 'Network error, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = async (userId: string) => {
    console.log('createWallet ID', userId);
    try {
      const resp = await apiService(postCreateWallet, 'post', {
        externalId: userId,
        walletType: 'USER',
      });
      console.log('createWallet', resp);
      navigation.navigate('welcome', { name: payload.firstName });
    } catch (error) {
      console.log('createWallet ERR', error);
    }
  };

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="OTP Verification" />
          <RegularText
            size={14}
            text="Enter the 6-digit code sent to your mobile number"
            style={styles.otpLabel}
          />
          <OTPInput setCode={setOtpCode} onResend={sendPhoneOTP} />
        </View>
        <Button
          text="Continue"
          isLoading={isLoading}
          disabled={!otpCode}
          onPress={verifyOtp}
        />
      </View>
    </BackgroundView>
  );
};
export default OTPVerification;
