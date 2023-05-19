import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthStackParamList } from '@types';
import Payments from '../screens/Payments';
import BuyAirtime from '../screens/Payments/Airtime';
import BottomTabs from './BottomTabs';
import ReviewPayment from '../screens/Payments/ReviewPayment';
import PaymentOptions from '../screens/Payments/PaymentOptions';
import WalletPIN from '../screens/WalletPIN';
import TransactionSuccess from '../screens/TransactionSuccess';

// const Stack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={BottomTabs} />
      <Stack.Screen name="payments" component={Payments} />
      <Stack.Screen name="buy_airtime" component={BuyAirtime} />
      <Stack.Screen name="review_payment" component={ReviewPayment} />
      <Stack.Screen name="payment_options" component={PaymentOptions} />
      <Stack.Screen name="wallet_pin" component={WalletPIN} />
      <Stack.Screen name="transaction_success" component={TransactionSuccess} />
    </Stack.Navigator>
  );
};

export default MainStack;
