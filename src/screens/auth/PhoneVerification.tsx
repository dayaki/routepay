import React, { useEffect, useState } from 'react';
import { TERMII_API, TERMII_SENDER, TERMII_VOICE_API } from '@env';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import {
  BackgroundView,
  Button,
  Loader,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { AuthNavigationProps } from '@types';
import { apiService, postRegister } from '@utils';
import { useLoginStyles } from './styles';

const PhoneVerification = ({ navigation, route }: AuthNavigationProps) => {
  const { payload } = route.params;
  const [otpCode, setOtpCode] = useState('');
  const [codeId, setCodeId] = useState<string | number>('');
  const [isLoading, setIsLoading] = useState(false);
  const [useVoice, setUseVoice] = useState(false);
  const toast = useToast();
  const styles = useLoginStyles();

  useEffect(() => {
    if (payload) {
      sendPhoneOTP();
    }
  }, []);

  const sendPhoneOTP = async () => {
    setUseVoice(false);
    const dataToSend = {
      api_key: TERMII_API,
      message_type: 'NUMERIC',
      pin_type: 'NUMERIC',
      channel: 'dnd',
      to: payload.phoneNumber,
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: '< 1234 >',
      message_text: `Hi ${payload.firstName}, your RoutePay confirmation code is < 1234 >. It expires in 5mins`,
      from: TERMII_SENDER,
    };

    try {
      const resp = await fetch('https://api.ng.termii.com/api/sms/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const res = await resp.json();
      console.log('sendPhoneOTP', res);
      const { pinId } = res;
      setCodeId(pinId);
    } catch (error: any) {
      console.log('sendPhoneOTP ERR', error);
      toast.show(error.message, { type: 'warning' });
    }
  };

  const sendVoiceOTP = async () => {
    setUseVoice(true);
    const otp = Math.floor(Math.random() * 90000);
    console.log('voice otp', otp);
    const dataToSend = {
      api_key: TERMII_API,
      phone_number: payload.phoneNumber,
      code: otp,
    };

    try {
      const resp = await fetch(TERMII_VOICE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const res = await resp.json();
      console.log('sendPhoneOTP', res);
      setCodeId(otp);
    } catch (error: any) {
      console.log('sendPhoneOTP ERR', error);
      toast.show(error.message, { type: 'warning' });
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    if (!useVoice) {
      try {
        const resp = await fetch(
          'https://api.ng.termii.com/api/sms/otp/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: TERMII_API,
              pin_id: codeId,
              pin: otpCode,
            }),
          },
        );
        const response = await resp.json();
        const { verified } = response;
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
    } else {
      setTimeout(() => {
        if (codeId === otpCode) {
          registerUser();
        } else {
          toast.show('Invalid confirmation code.', { type: 'warning' });
          setIsLoading(false);
          return;
        }
      }, 600);
    }
  };

  const registerUser = async () => {
    try {
      const resp = await apiService(postRegister, 'post', payload);
      const { id, message, succeeded } = resp;
      console.log('registerUser', resp);
      if (succeeded) {
        navigation.navigate('welcome', { name: payload.firstName });
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
      console.log('registerUser ERR', error);
      navigation.navigate('signup', {
        error: 'Network error, please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="OTP Verification" />
          <RegularText
            size={14}
            text="Enter the 6-digit code sent to your mobile number"
            style={styles.otpLabel}
          />
          <OTPInput
            setCode={setOtpCode}
            onResend={sendPhoneOTP}
            onVoiceCall={sendVoiceOTP}
            isEmail={false}
          />
        </View>
        <Button
          text="Continue"
          // isLoading={isLoading}
          disabled={!otpCode}
          onPress={verifyOtp}
        />
      </View>
    </BackgroundView>
  );
};
export default PhoneVerification;
