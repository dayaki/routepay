import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@types';
import Onboarding from '../screens/auth/Onboarding';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import OTPVerification from '../screens/auth/PhoneVerification';
import Welcome from '../screens/auth/Welcome';
import SetPIN from '../screens/auth/SetPIN';
import { useAppSelector } from '@store';
import Verify2FA from '../screens/auth/Verify2FA';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { onboarded } = useAppSelector(state => state.user);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={onboarded ? 'login' : 'onboarding'}>
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Register} />
      <Stack.Screen name="forgot_password" component={ForgotPassword} />
      <Stack.Screen name="reset_password" component={ResetPassword} />
      <Stack.Screen name="phone_verification" component={OTPVerification} />
      {/* <Stack.Screen name="email_verification" component={EmailVerification} /> */}
      <Stack.Screen name="verify_2fa" component={Verify2FA} />
      <Stack.Screen name="set_pin" component={SetPIN} />
      <Stack.Screen name="welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default AuthStack;
