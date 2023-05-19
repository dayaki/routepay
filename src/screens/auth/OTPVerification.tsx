import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import {
  BackgroundView,
  Button,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { useLoginStyles } from './styles';
import { AuthNavigationProps } from '@types';
import { formatPhone } from '@utils';

const OTPVerification = ({ navigation, route }: AuthNavigationProps) => {
  const { phone } = route.params;
  const [otpCode, setOtpCode] = useState('');
  const [codeId, setCodeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const styles = useLoginStyles();

  useEffect(() => {
    sendPhoneOTP();
  }, []);

  const sendPhoneOTP = async () => {
    const payload = {
      api_key: 'TLbD71MthTFVBoQMnynZBYV42rB3vacQmBersDbpwxeW7uzCjWBIwJNRufK4mq',
      message_type: 'NUMERIC',
      pin_type: 'NUMERIC',
      channel: 'generic',
      to: formatPhone(phone),
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
        body: JSON.stringify(payload),
      });
      const { pinId } = await resp.json();
      console.log('response', pinId);
      setCodeId(pinId);
      // {"pinId": "95c6083c-c277-46ac-a93d-3526b70ba285", "smsStatus": "Message Sent", "status": 200, "to": "2347038327370"}
    } catch (error: any) {
      console.log('sendPhoneOTP ERR', error);
      toast.show(error.message, { type: 'warning' });
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const payload = {
      api_key: 'TLbD71MthTFVBoQMnynZBYV42rB3vacQmBersDbpwxeW7uzCjWBIwJNRufK4mq',
      pin_id: codeId,
      pin: otpCode,
    };
    try {
      const resp = await fetch('https://api.ng.termii.com/api/sms/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const response = await resp.json();
      console.log('verifyOtp response', response);
      if (response.verified) {
        navigation.navigate('welcome');
      } else {
        toast.show('Invalid confirmation code.', { type: 'warning' });
      }
      setIsLoading(false);
      // {"attemptsRemaining": 0, "msisdn": "2347038327370", "pinId": "35a06912-e864-42e2-bae8-9b21e804c8b3", "verified": false}
      //
    } catch (error: any) {
      console.log('verifyOtp ERR', error);
      toast.show(error.message, { type: 'warning' });
      setIsLoading(false);
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
