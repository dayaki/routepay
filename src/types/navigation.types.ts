import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  onboarding: undefined;
  login: undefined;
  signup: undefined;
  verify_email: { email: string };
  forgot_password: undefined;
  reset_password: undefined;
  phone_verification: { phone: string };
  email_verification: { email: string };
  set_pin: undefined;
  welcome: undefined;
};

export type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList>;
