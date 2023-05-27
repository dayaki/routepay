import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { decode } from 'react-native-pure-jwt';
import axios from 'axios';
import Config from 'react-native-config';
import { useLoginStyles } from './styles';
import {
  BackgroundView,
  Button,
  Input,
  RegularText,
  TextButton,
  TitleText,
} from '@common';
import { Lock, Mail } from '@icons';
import { apiService, getLogin, getProfile, getWalletBalance } from '@utils';
import { accountSetUp, updateToken, useAppDispatch, userLogin } from '@store';

const { CLIENT_SECRET = '' } = Config;

const Login = ({ navigation, route }) => {
  const goBack = route.params?.goBack || true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const {
        data: { accessToken },
      } = await axios.get(getLogin, {
        auth: {
          username: email,
          password: password,
        },
      });
      dispatch(updateToken(accessToken));
      const {
        payload: { sub },
      } = await decode(accessToken, CLIENT_SECRET, {
        skipValidation: true,
      });
      const userProfile = await apiService(getProfile(sub), 'get');
      dispatch(accountSetUp());
      dispatch(userLogin(userProfile));
      // if (!userProfile.pinEnabled) {
      //   navigation.navigate('set_pin', { payload: userProfile, password });
      // } else {
      //   dispatch(accountSetUp());
      //   dispatch(userLogin(userProfile));
      // }

      // const data = await apiService(getWalletBalance(payload.sub), 'get');
      console.log('userProfile data', userProfile);
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
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail size={14} />}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            isPassword
            leftIcon={<Lock size={16} />}
          />
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
