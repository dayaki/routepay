import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-bars';
import { AppState } from 'react-native';
import moment from 'moment';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {
  setLockAert,
  setappState,
  setlogOffTime,
  useAppDispatch,
  useAppSelector,
  userLogout,
} from '@store';

const Router = () => {
  const { theme } = useAppSelector(state => state.misc);
  const { user, logOffTime, lockAlertVisibility, isAuthenticated } =
    useAppSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const timer = useRef(240000); //4mins check

  useEffect(() => {
    console.log('!!!!!! ==== APP INDEX FILE ===== !!!!!!!!');
    // dispatch(setlogOffTime(''));
    dispatch(setappState(AppState.currentState));
    const state = AppState.addEventListener('change', handleAppStateChange);
    if (lockAlertVisibility) {
      dispatch(userLogout());
      console.log('USER LOCK!!!!!');
    }
    // if (user?.pinEnabled) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'pin_setup' }],
    //   });
    // }
    return () => {
      state.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    const active = nextAppState === 'active';
    const appInactive =
      nextAppState === 'inactive' || nextAppState === 'background';

    if (active) {
      const logOnTime = moment().toJSON(); //Date.now();
      const timeElapsed = moment(logOnTime).diff(logOffTime, 'milliseconds'); //logOnTime - logOffTime;
      console.log('logOnTime', logOnTime);
      console.log('logOffTime', logOffTime);
      console.log('timeElapsed', timeElapsed);
      console.log('timer.current', timer.current);

      if (
        !!logOffTime &&
        timer.current < timeElapsed &&
        isAuthenticated &&
        !lockAlertVisibility
      ) {
        dispatch(setLockAert(true));
        if (!lockAlertVisibility) {
          // navigation.navigate('unlock');
          dispatch(userLogout());
          console.log('USER LOCK TWO!!!!!');
        }
      }
      // dispatch(setlogOffTime(''));
    } else if (appInactive) {
      dispatch(setlogOffTime(moment().toJSON()));
    }
    dispatch(setappState(nextAppState));
  };

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </>
  );
};

export default Router;
