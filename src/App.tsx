import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import axios, { AxiosHeaders } from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { encode } from 'base-64';
import { persistor, store, userLogout } from '@store';
import Router from './navigation';
import { navigationRef } from './navigation/RootNavigation';
import { DarkMode, LightMode } from '@common';
import { StatusBar } from 'react-native-bars';
import { getLogin, postRegister } from '@utils';
// import { refreshToken, MonoSetup } from '@utils';

if (!global.btoa) {
  global.btoa = encode;
}

axios.interceptors.request.use(
  config => {
    // console.log('config.url', config.url);
    if (config.url !== getLogin && config.url !== postRegister) {
      const token =
        'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYmYiOjE2ODQ5NTMwNzEsImV4cCI6MTY4NDk1NjY3MSwiaXNzIjoiaHR0cHM6Ly9hdXRoZGV2LnJvdXRlcGF5LmNvbS8iLCJhdWQiOiJSb3V0ZVBheS5CaWxsc1BheW1lbnRBcGkiLCJzdWIiOiIxNzEyNGYzNy1lYjg4LTQ0YmYtYTQ0Yy1lM2EzMzQ5MzFhNDkiLCJhdXRoX3RpbWUiOiIxNjg0OTUzMDcxIiwiaWRwIjoibG9jYWwiLCJyb2xlIjoiQ3VzdG9tZXIiLCJzb3VyY2UiOiJCaWxsc1BvcnRhbCIsImp0aSI6IjhkZTJkOTljLWMyOGMtNGNmZS1hMzhkLTc0ZWJiYzE5ZmNlZiIsInNpZCI6Ijg3MGM2YjdkLThhYjgtNGNlYi04NDM3LWM4NjE0NjAzZDUwZSIsImlhdCI6MTY4NDk1MzA3MSwic2NvcGUiOlsiUm91dGVQYXkuQmlsbHNQYXltZW50LnJlYWQiLCJSb3V0ZVBheS5CaWxsc1BheW1lbnQud3JpdGUiLCJSb3V0ZVBheS5NZXJjaGFudEFwaS5yZWFkIiwiUm91dGVQYXkuTWVyY2hhbnRBcGkud3JpdGUiXSwiYW1yIjoicHdkIn0.';
      // store.getState().user.token;
      if (config.headers) {
        console.log('interceptors token', token);
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

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     const { config = {}, response = {} } = error || {};
//     const { status, data = {} } = response || {};
//     const { message } = data;
//     if (
//       status &&
//       (status === 401 || status === 400) &&
//       !config.url.includes('/auth/')
//     ) {
//       console.log('expired token', data);

//       // refresh token
//       //   refreshToken();
//       store.dispatch(userLogout());
//     }
//     return Promise.reject(error);
//   },
// );

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
