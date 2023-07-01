import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  onboarding: undefined;
  login: { goBack: boolean } | undefined;
  signup: { error: string };
  verify_email: { email: string };
  forgot_password: undefined;
  reset_password: undefined;
  verify_2fa: { email: string };
  phone_verification: {
    payload: {
      email: string;
      phoneNumber: string;
      password: string;
      firstName: string;
      lastName: string;
      status: boolean;
    };
  };
  email_verification: { email: string };
  set_pin: { payload: any; password: string };
  welcome: { name: string } | undefined;
};

export type MainStackParamList = {
  transaction_success: {
    type: string;
    message: string;
    title: string;
    buttonText: string;
    data: {} | undefined;
    routePath: string | undefined;
  };
};

export type AuthNavigationProps = NativeStackScreenProps<AuthStackParamList>;

export type MainNavigationProps = NativeStackScreenProps<
  MainStackParamList,
  'transaction_success'
>;
