import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@types';
import Onboarding from '../screens/auth/Onboarding';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import OTPVerification from '../screens/auth/OTPVerification';
import Welcome from '../screens/auth/Welcome';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="onboarding">
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Register} />
      <Stack.Screen name="forgot_password" component={ForgotPassword} />
      <Stack.Screen name="reset_password" component={ResetPassword} />
      <Stack.Screen name="otp_verification" component={OTPVerification} />
      <Stack.Screen name="welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default AuthStack;
