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
import { apiService, getLogin, getProfile, postVerify2fa } from '@utils';
import {
  accountSetUp,
  loyaltySetUp,
  updateToken,
  useAppDispatch,
  userLogin,
} from '@store';
import { useLoginStyles } from './styles';
import axios from 'axios';

const Verify2FA = ({ navigation, route }: AuthNavigationProps) => {
  const { email = '', password = '' } = route.params;
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState('');
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
      const { accessToken } = response;
      if (accessToken) {
        handleLogin(accessToken);
      } else {
        setHasError('Invalid Two Factor code. Check the code and try again!');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('verifyOtp ERR', error);
      setIsLoading(false);
    }
  };

  const handleLogin = async (token: string) => {
    try {
      dispatch(updateToken(token));
      const payload = await decode(token.split('.')[1]);
      const { sub } = JSON.parse(payload);
      const userProfile = await apiService(getProfile(sub), 'get');
      dispatch(accountSetUp(userProfile.userId));
      dispatch(loyaltySetUp('08032009444')); //userProfile.phoneNumber
      if (!userProfile.pinEnabled) {
        navigation.navigate('set_pin', { payload: userProfile, password });
        setIsLoading(false);
      } else {
        // dispatch(accountSetUp(userProfile.userId));
        dispatch(userLogin(userProfile));
        setIsLoading(false);
      }
    } catch (error) {
      console.log('handleLogin ERR', error);
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    console.log('sendinf.....');
    try {
      await axios.get(getLogin, {
        auth: {
          username: email,
          password: password,
        },
      });
    } catch (error) {
      console.log('resendOtp ERR', error);
    }
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
          {!!hasError && (
            <RegularText
              size={12}
              text={hasError}
              color="red"
              style={styles.errorText}
            />
          )}
          <OTPInput setCode={setPin} onResend={resendOtp} />
        </View>
        <Button text="Continue" disabled={!pin} onPress={verifyOtp} />
      </View>
    </BackgroundView>
  );
};
export default Verify2FA;
