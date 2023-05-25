import React from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAppSelector } from '@store';
import { StatusBar } from 'react-native-bars';

const Router = () => {
  const {
    user: { isAuthenticated },
    misc: { theme },
  } = useAppSelector(state => state);
  return (
    <>
      <StatusBar
        animated={true}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {!isAuthenticated ? <MainStack /> : <AuthStack />}
    </>
  );
};

export default Router;
