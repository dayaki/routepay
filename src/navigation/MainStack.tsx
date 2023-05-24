import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthStackParamList } from '@types';
import BottomTabs from './BottomTabs';
import Payments from '../screens/payments';
import Airtime from '../screens/payments/airtime';
import BuyAirtime from '../screens/payments/airtime/BuyAirtime';
import ReviewPayment from '../screens/payments/ReviewPayment';
import PaymentOptions from '../screens/payments/PaymentOptions';
import WalletPIN from '../screens/WalletPIN';
import TransactionSuccess from '../screens/TransactionSuccess';
import Data from '../screens/payments/data';
import BuyData from '../screens/payments/data/BuyData';
import BuyFuel from '../screens/payments/BuyFuel';
import Bills from '../screens/payments/bills';
import CableTV from '../screens/payments/bills/CableTV';
import Pins from '../screens/payments/pins';
import BuyNetworkPins from '../screens/payments/pins/BuyPins';
import Electricity from '../screens/payments/bills/Electricity';
import BuyElectricity from '../screens/payments/bills/BuyElectricity';
import ScanPay from '../screens/payments/scan';

// const Stack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={BottomTabs} />
      <Stack.Screen name="payments" component={Payments} />
      <Stack.Screen name="airtime" component={Airtime} />
      <Stack.Screen name="buy_airtime" component={BuyAirtime} />
      <Stack.Screen name="data" component={Data} />
      <Stack.Screen name="buy_data" component={BuyData} />
      <Stack.Screen name="buy_fuel" component={BuyFuel} />
      <Stack.Screen name="bills" component={Bills} />
      <Stack.Screen name="pins_landing" component={Pins} />
      <Stack.Screen name="network_pins" component={BuyNetworkPins} />
      <Stack.Screen name="cable_tv" component={CableTV} />
      <Stack.Screen name="electricity" component={Electricity} />
      <Stack.Screen name="buy_electricity" component={BuyElectricity} />
      <Stack.Screen name="scan_landing" component={ScanPay} />
      <Stack.Screen name="review_payment" component={ReviewPayment} />
      <Stack.Screen name="payment_options" component={PaymentOptions} />
      <Stack.Screen name="wallet_pin" component={WalletPIN} />
      <Stack.Screen name="transaction_success" component={TransactionSuccess} />
    </Stack.Navigator>
  );
};

export default MainStack;
