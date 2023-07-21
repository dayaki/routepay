/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'react-native-bars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAppSelector } from '@store';

const Router = () => {
  const { theme } = useAppSelector(state => state.misc);
  const { isAuthenticated } = useAppSelector(state => state.user);
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {isAuthenticated ? (
        <MainStack />
      ) : (
        // <View
        //   style={{
        //     flex: 1,
        //     paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
        //     backgroundColor: '#fff',
        //   }}>
        <AuthStack />
        // </View>
      )}
    </>
  );
};

export default Router;
