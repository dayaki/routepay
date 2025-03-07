import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { decode } from 'base-64';
import axios from 'axios';
import {
  BackgroundView,
  Button,
  Input,
  RegularText,
  TextButton,
  TitleText,
} from '@common';
import { Lock, Mail } from '@icons';
import { apiService, getLogin, getProfile } from '@utils';
import {
  accountSetUp,
  loyaltySetUp,
  updateToken,
  useAppDispatch,
  useAppSelector,
  userLogin,
} from '@store';
import { LoginNavProps } from '@types';
import { useLoginStyles } from './styles';

const Login = ({ navigation, route }: LoginNavProps) => {
  const { username, email } = useAppSelector(state => state.user);
  const goBack = route.params?.goBack || true;
  const [userEmail, setUserEmail] = useState(email || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    let updateUsername;
    if (/^\d+$/.test(userEmail)) {
      updateUsername = userEmail.startsWith('234')
        ? `0${userEmail.slice(3)}`
        : `234${userEmail.slice(1)}`;
    } else {
      updateUsername = userEmail;
    }
    try {
      const {
        data: { accessToken, message, twoFactorEnabled },
      } = await axios.get(getLogin, {
        auth: {
          username: updateUsername,
          password: password,
        },
      });
      if (!accessToken) {
        if (
          message.toLowerCase().includes('this email address is not confirmed')
        ) {
          setHasError(
            'Please confirm your account with the email confirmation message sent to your mailbox.',
          );
        } else if (message.toLowerCase().includes('invalid login attempt')) {
          setHasError('Invalid email address or password.');
        } else if (twoFactorEnabled) {
          navigation.navigate('verify_2fa', {
            email: updateUsername,
            password,
          });
        }
      } else {
        dispatch(updateToken(accessToken));
        const payload = await decode(accessToken.split('.')[1]);
        const { sub } = JSON.parse(payload);
        const userProfile = await apiService(getProfile(sub), 'get');
        if (!userProfile.pinEnabled) {
          navigation.navigate('set_pin', { payload: userProfile, password });
        } else {
          dispatch(loyaltySetUp('08032009444')); //userProfile.phoneNumber
          dispatch(accountSetUp(userProfile.userId));
          dispatch(userLogin(userProfile));
        }
      }
    } catch (error) {
      console.log('handleLogin ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView hasBack={goBack}>
      <View style={styles.content}>
        <View>
          {username ? (
            <TitleText text={`Welcome back, ${username}!`} />
          ) : (
            <TitleText text="Welcome back" />
          )}
          <View style={styles.texts}>
            <Text style={styles.label}>
              Enter your <Text style={styles.brandName}>routepay</Text> account
              login details.
            </Text>
          </View>
          <Input
            editable={!isLoading}
            value={userEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setUserEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail size={14} />}
          />
          <Input
            value={password}
            editable={!isLoading}
            onChangeText={setPassword}
            placeholder="Password"
            isPassword
            leftIcon={<Lock size={16} />}
          />
          {!!hasError && (
            <RegularText text={hasError} color="#FF6600" size={11} />
          )}
          <Button
            text="Login"
            disabled={!userEmail || password.length < 5}
            onPress={handleLogin}
            style={styles.loginBtn}
            isLoading={isLoading}
          />
          <View style={styles.row}>
            <RegularText text="Forgot Password? " />
            <TextButton
              text="Reset"
              onPress={() => navigation.navigate('forgot_password')}
            />
          </View>
        </View>
        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          <RegularText text="Don’t have an account? " />
          <TextButton
            text="Create an account"
            onPress={() => navigation.navigate('signup')}
            textStyle={styles.brand}
          />
        </View>
      </View>
    </BackgroundView>
  );
};

export default Login;
