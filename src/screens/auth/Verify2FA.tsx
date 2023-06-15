import React, { useState } from 'react';
import { View } from 'react-native';
import { decode } from 'base-64';
import {
  BackgroundView,
  Button,
  Loader,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { AuthNavigationProps } from '@types';
import { apiService, getProfile, postVerify2fa } from '@utils';
import {
  accountSetUp,
  loyaltySetUp,
  updateToken,
  useAppDispatch,
  userLogin,
} from '@store';
import { useLoginStyles } from './styles';

const Verify2FA = ({ navigation, route }: AuthNavigationProps) => {
  const { email = '', password = '' } = route.params;
  // const email = route.params.email || '';
  // const password = route.params.password || '';
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await apiService(postVerify2fa, 'post', {
        username: email,
        code: pin,
      });
      console.log('verifyOtp', response);
      handleLogin(response);
    } catch (error) {
      console.log('verifyOtp ERR', error);
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: any) => {
    try {
      const { accessToken } = data;
      dispatch(updateToken(accessToken));
      const payload = await decode(accessToken.split('.')[1]);
      const { sub } = JSON.parse(payload);
      const userProfile = await apiService(getProfile(sub), 'get');
      dispatch(accountSetUp(userProfile.userId));
      dispatch(loyaltySetUp('08032009444')); //userProfile.phoneNumber
      if (!userProfile.pinEnabled) {
        navigation.navigate('set_pin', { payload: userProfile, password });
      } else {
        // dispatch(accountSetUp(userProfile.userId));
        dispatch(userLogin(userProfile));
      }
    } catch (error) {
      console.log('handleLogin ERR', error);
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    console.log('sendinf.....');
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="2FA Verification!" />
          <RegularText
            size={14}
            text="Enter the 6-digit code sent to your email address"
            style={styles.otpLabel}
          />
          <OTPInput setCode={setPin} onResend={resendOtp} />
        </View>
        <Button
          text="Continue"
          disabled={!pin}
          onPress={verifyOtp}
          isLoading={isLoading}
        />
      </View>
    </BackgroundView>
  );
};
export default Verify2FA;
