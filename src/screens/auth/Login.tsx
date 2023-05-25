import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { decode } from 'react-native-pure-jwt';
import base64 from 'react-native-base64';
// import Config from 'react-native-config';
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
import {
  apiService,
  getLogin,
  getProfile,
  getWalletBalance,
  postLogin,
  postToken,
} from '@utils';
import { updateToken, useAppDispatch } from '@store';
import axios from 'axios';

// const { CLIENT_ID, CLIENT_SECRET } = Config;

// base config
const config = {
  issuer: 'https://authdev.routepay.com/',
  clientId: 'billsPortal',
  redirectUrl: 'routepay://auth/callback',
  scopes: [
    'openid',
    'profile',
    'RoutePay.MerchantApi.read',
    'RoutePay.MerchantApi.write',
    'RoutePay.PaymentApi.read',
    'RoutePay.PaymentApi.write',
    'RoutePay.BillsPayment.read',
    'RoutePay.BillsPayment.write',
  ],
};

const Login = ({ navigation, route }) => {
  const goBack = route.params?.goBack || true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();

  // 17124f37-eb88-44bf-a44c-e3a334931a49
  // 17124f37-eb88-44bf-a44c-e3a334931a49

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
      console.log('handleLogin TOKEN', accessToken);
      dispatch(updateToken(accessToken));
      const { payload } = await decode(accessToken, 'dujri1-Wedkid-gafryw', {
        skipValidation: true,
      });
      console.log('decided', payload.sub);
      // const data = await apiService(getProfile(payload.sub), 'get');
      const walletResp = await apiService(getWalletBalance(payload.sub), 'get');
      // console.log('getProfile data', data);
      console.log('wallet data', walletResp);
    } catch (error) {
      console.log('handleLogin ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    // const formData = new URLSearchParams();
    // formData.append('grant_type', 'client_credentials');
    // formData.append('client_id', 'CkDywmwrbsGxrMk');
    // formData.append('client_secret', 'JScDlRplmEbFbzjFRqCbvPBggxPErY');

    // try {
    //   console.log('fetchData payload', formData.toString());
    //   const resp = await apiService(postToken, 'post', formData.toString(), {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   });
    //   console.log('fetchData', resp);
    // } catch (error) {
    //   console.log('fetchData RERR', error);
    // }

    fetch(postToken, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'CkDywmwrbsGxrMk',
        client_secret: 'JScDlRplmEbFbzjFRqCbvPBggxPErY',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(resp => resp.json())
      .then(response => {
        console.log('fetchData', JSON.stringify(response));
        // Do stuff with the response
      })
      .catch(res => {
        console.log('fetchData ERRR', JSON.stringify(res));
      });
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
            rightIcon={<Mail />}
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
