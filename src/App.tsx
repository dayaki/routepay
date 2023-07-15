import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import axios, { AxiosHeaders } from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { encode } from 'base-64';
import { persistor, store, userLogout } from '@store';
import Router from './navigation';
import { navigationRef } from './navigation/RootNavigation';
import { DarkMode, LightMode } from '@common';
import { StatusBar } from 'react-native-bars';
import {
  getLogin,
  postForgotPass,
  postInitPayment,
  postPaymentToken,
  postRegister,
} from '@utils';
// import { refreshToken, MonoSetup } from '@utils';

if (!global.btoa) {
  global.btoa = encode;
}

axios.interceptors.request.use(
  config => {
    if (
      config.url !== getLogin &&
      config.url !== postRegister &&
      config.url !== postPaymentToken &&
      config.url !== postInitPayment &&
      config.url !== postForgotPass &&
      !config.url?.includes('/payment/api/v1/')
    ) {
      const token = store.getState().user.token;
      if (config.headers) {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearer ${token}`,
        );
      }
      return config;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { config = {}, response = {} } = error || {};
    const { status, data = {} } = response || {};
    // const { message, title } = data;
    if (
      status &&
      status === 401 &&
      !config.url.includes('/auth/') &&
      response.headers['www-authenticate'].includes('invalid_token')
    ) {
      console.log('expired token RESPONSE', response);
      // const {} = response.headers;
      console.log('expired token DATA', response.headers);
      console.log(
        'expired token authenticate',
        response.headers['www-authenticate'],
      );
      // refresh token
      //   refreshToken();
      store.dispatch(userLogout());
    }
    return Promise.reject(error);
  },
);

const linking = {
  prefixes: ['routepay://', 'https://applink.routepay.com'],
  config: {
    screens: {
      Register: 'auth/callback',
    },
  },
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider
          placement="bottom"
          animationType="slide-in"
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          offsetBottom={50}
          swipeEnabled={true}>
          <SafeAreaProvider>
            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              fallback={<Text>Loading...</Text>}
              theme={
                store.getState().misc.theme === 'dark' ? DarkMode : LightMode
              }>
              <StatusBar
                animated={true}
                barStyle={
                  store.getState().misc.theme === 'dark'
                    ? 'light-content'
                    : 'dark-content'
                }
              />
              <Router />
            </NavigationContainer>
          </SafeAreaProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
