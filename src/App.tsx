import React from 'react';
import { StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import axios, { AxiosHeaders } from 'axios';
import { Provider } from 'react-redux';
import { persistor, store } from '@store';
import Router from './navigation';
import { navigationRef } from './navigation/RootNavigation';
// import { refreshToken, MonoSetup } from '@utils';

axios.interceptors.request.use(
  config => {
    if (!config.url?.includes('/auth/')) {
      const token = store.getState().user.token?.access_token;
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

const App = () => {
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
          <NavigationContainer ref={navigationRef}>
            <Router />
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
