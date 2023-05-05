// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import {
//   CompositeScreenProps,
//   NavigatorScreenParams,
// } from '@react-navigation/native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  onboarding: undefined;
  login: undefined;
  signup: undefined;
  verify_email: { email: string };
  forgot_password: undefined;
  reset_password: undefined;
  otp_verification: { type: string } | undefined;
  set_pin: undefined;
  welcome: undefined;
};
