import React, { useEffect } from 'react';
import { StatusBar, Text, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';
import axios, { AxiosHeaders } from 'axios';
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
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IkRFNkYwNDYyQjQyMzc4NEJGM0JCMTNGMTc2OTNDNUJEIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODQzNjQ3NDEsImV4cCI6MTY4NDM2ODM0MSwiaXNzIjoiaHR0cHM6Ly9hdXRoZGV2LnJvdXRlcGF5LmNvbSIsImF1ZCI6WyJSb3V0ZVBheS5NZXJjaGFudEFwaSIsIlJvdXRlUGF5LlBheW1lbnRBcGkiLCJSb3V0ZVBheS5CaWxsc1BheW1lbnRBcGkiXSwiY2xpZW50X2lkIjoiYmlsbHNQb3J0YWwiLCJzdWIiOiIxNzEyNGYzNy1lYjg4LTQ0YmYtYTQ0Yy1lM2EzMzQ5MzFhNDkiLCJhdXRoX3RpbWUiOjE2ODQzNjQ3MzgsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJkYXlvYWtpbmt1b3dvQGdtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsIm5hbWUiOiJEYXlvIEphbWVzb24iLCJwaWN0dXJlIjoibnVsbCIsInNvdXJjZSI6IiIsImp0aSI6IjQ0RjRGNzk1RjJCMTJGMUY4NkI2RUUxNDNEMTUwMDAxIiwic2lkIjoiMjYxMzFGRjVGRTUyMDU1REEzQjYzMDE3NTUxOEE5MDMiLCJpYXQiOjE2ODQzNjQ3NDEsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJSb3V0ZVBheS5NZXJjaGFudEFwaS5yZWFkIiwiUm91dGVQYXkuTWVyY2hhbnRBcGkud3JpdGUiLCJSb3V0ZVBheS5QYXltZW50QXBpLnJlYWQiLCJSb3V0ZVBheS5QYXltZW50QXBpLndyaXRlIiwiUm91dGVQYXkuQmlsbHNQYXltZW50LnJlYWQiLCJSb3V0ZVBheS5CaWxsc1BheW1lbnQud3JpdGUiXSwiYW1yIjpbInB3ZCJdfQ.ev5TwA4cTGX9eUvrHeBW8Fq5eWNH5HZV4aszooSJbZAOPJ4cya5iMTDslubTjAw5WDQ3rKJj6BE7objs3mEbLJf4_CZ1ltCYe3EMrSsbH7V4KrmxDM6GisqA2DXuwZaTfcSP3dHKlAm-2DrOSf7NGQpuVgQgTeBlGkMGA4zbvYWHLY25JCFhydDzFH7CTSgqlaJMNKufVzeB467xWKe1WmCcrQFmh2opErOBXJODGw92zolXF0NQKjNDN0yznu-UVEUYCXUsERf_KwLym4A6fGGS4Rcj-MWF4wfXSmQKfJOcsCXQQtm1tC86RlhpUnfc29tBAbdnpS9-T4n8qjVDAg';
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
            {/* <ViewWrapper> */}
            <Router />
            {/* </ViewWrapper> */}
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
