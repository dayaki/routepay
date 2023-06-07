import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { decode } from 'base-64';
import axios from 'axios';
import Config from 'react-native-config';
import { useToast } from 'react-native-toast-notifications';
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
  userLogin,
} from '@store';
import { useLoginStyles } from './styles';

const { CLIENT_SECRET = '' } = Config;

const Login = ({ navigation, route }) => {
  const goBack = route.params?.goBack || true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const {
        data: { accessToken, message, twoFactorEnabled },
      } = await axios.get('https://authdev.routepay.com/api/token', {
        auth: {
          username: email,
          password: password,
        },
      });
      console.log('handleLogin', accessToken, message);
      if (!accessToken) {
        if (message.includes('This email address is not confirmed')) {
          setHasError(message);
        } else if (message.includes('Invalid Login Attempt')) {
          setHasError('Invalid email address or password.');
        } else if (twoFactorEnabled) {
          navigation.navigate('verify_2fa', { email, password });
          toast.show(message);
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
          <TitleText text="Welcome back, Jane!" />
          <View style={styles.texts}>
            <Text style={styles.label}>
              Enter your email or mobile number to continue to your{' '}
              <Text style={styles.brandName}>routepay</Text> account.
            </Text>
          </View>
          <Input
            editable={!isLoading}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
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
            disabled={!email || password.length < 5}
            onPress={handleLogin}
            style={styles.loginBtn}
            isLoading={isLoading}
          />
          <View style={styles.row}>
            <RegularText text="Forgot Password?" />
            <TextButton
              text="Reset"
              onPress={() => navigation.navigate('forgot_password')}
            />
          </View>
        </View>
        <View style={styles.row}>
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
