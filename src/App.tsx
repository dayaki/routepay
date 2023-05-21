import React, { useEffect } from 'react';
import { StatusBar, Text, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import axios, { AxiosHeaders } from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from '@store';
import Router from './navigation';
import { navigationRef } from './navigation/RootNavigation';
import { DarkMode, LightMode } from '@common';
// import { refreshToken, MonoSetup } from '@utils';

axios.interceptors.request.use(
  config => {
    if (!config.url?.includes('/register')) {
      // const token = store.getState().user.token?.access_token;
      const token =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IkRFNkYwNDYyQjQyMzc4NEJGM0JCMTNGMTc2OTNDNUJEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODQ1MDA1NTgsImV4cCI6MTY4NDUwNDE1OCwiaXNzIjoiaHR0cHM6Ly9hdXRoZGV2LnJvdXRlcGF5LmNvbSIsImF1ZCI6WyJSb3V0ZVBheS5NZXJjaGFudEFwaSIsIlJvdXRlUGF5LlBheW1lbnRBcGkiLCJSb3V0ZVBheS5CaWxsc1BheW1lbnRBcGkiXSwiY2xpZW50X2lkIjoiYmlsbHNQb3J0YWwiLCJzdWIiOiIxNzEyNGYzNy1lYjg4LTQ0YmYtYTQ0Yy1lM2EzMzQ5MzFhNDkiLCJhdXRoX3RpbWUiOjE2ODQ1MDA0ODYsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJkYXlvYWtpbmt1b3dvQGdtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsIm5hbWUiOiJEYXlvIEphbWVzb24iLCJwaWN0dXJlIjoibnVsbCIsInNvdXJjZSI6IiIsImp0aSI6Ijk4RTQwQ0Y5NDlFNkUzMDc3NEY1MERDREVGNUUyMDQ2Iiwic2lkIjoiQjAwNkI5QjE4QTAxNjY0NjA2NTY4QkU1MTY5NTZEODEiLCJpYXQiOjE2ODQ1MDA1NTgsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJSb3V0ZVBheS5NZXJjaGFudEFwaS5yZWFkIiwiUm91dGVQYXkuTWVyY2hhbnRBcGkud3JpdGUiLCJSb3V0ZVBheS5QYXltZW50QXBpLnJlYWQiLCJSb3V0ZVBheS5QYXltZW50QXBpLndyaXRlIiwiUm91dGVQYXkuQmlsbHNQYXltZW50LnJlYWQiLCJSb3V0ZVBheS5CaWxsc1BheW1lbnQud3JpdGUiXSwiYW1yIjpbInB3ZCJdfQ.T2tU6WkOmryLPhgvr68LnLwbcuArZrtm-Bi3G5rYKjjnRnAqOhBgzc9B8DpPkEW8JWruz6frOOhzjf-K5soyPI_yMcA69kwwAYNGatn5gjFacQtqYEYQBJHgQwbtOVREYICSICsr57yojSas8HwAFMFnwBgogM-EADx2efX4SiE9LN-CkjfxKaL-QLuDJDMKrvPqlNCD74iHEjYLWZpmeptQBGfosHvx7Bvk_MfjwvhfUMtxgzEsFWpsb5DakoIJWUs6u5seVaKDy3jxsyHXxu6eumf_LaF52QeCF15ti2-cRk6rp30Lc0eeYFl5H2EiiNAO76u2_eoqs2JmCqYFPA';
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
      !config.url.includes('/auth/') &&
      message === 'Unauthenticated.'
    ) {
      // refresh token
      //   refreshToken();
      // store.dispatch(userLogout());
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
  const scheme = useColorScheme();

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
          <StatusBar barStyle="dark-content" />
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<Text>Loading...</Text>}
            theme={scheme === 'dark' ? DarkMode : LightMode}>
            <Router />
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
