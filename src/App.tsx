import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import axios, { AxiosHeaders } from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store, userLogout } from '@store';
import Router from './navigation';
import { navigationRef } from './navigation/RootNavigation';
import { DarkMode, LightMode } from '@common';
import { StatusBar } from 'react-native-bars';
// import { refreshToken, MonoSetup } from '@utils';

axios.interceptors.request.use(
  config => {
    if (!config.url?.includes('/register')) {
      const token = store.getState().user.token;
      if (config.headers) {
        console.log('token', token);
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
    const { message } = data;
    if (
      status &&
      (status === 401 || status === 400) &&
      !config.url.includes('/auth/')
    ) {
      console.log('expired token');

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
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
