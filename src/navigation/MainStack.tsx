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
import EditProfile from '../screens/profile/EditProfile';
import Refer from '../screens/profile/Refer';
import ChangePassword from '../screens/profile/ChangePassword';
import Statement from '../screens/profile/statement';
import SendStatement from '../screens/profile/statement/SendStatement';
import Support from '../screens/profile/Support';
import ChangePIN from '../screens/profile/ChangePIN';
import SendMoney from '../screens/wallet/send-money';
import Routepay from '../screens/wallet/send-money/RoutePay';
import BankPayment from '../screens/wallet/send-money/BankPayment';

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
      {/* Wallet */}
      <Stack.Screen name="send_money" component={SendMoney} />
      <Stack.Screen name="send_routepay" component={Routepay} />
      <Stack.Screen name="send_bank" component={BankPayment} />
      {/* Profile */}
      <Stack.Screen name="edit_profile" component={EditProfile} />
      <Stack.Screen name="refer" component={Refer} />
      <Stack.Screen name="password" component={ChangePassword} />
      <Stack.Screen name="statement" component={Statement} />
      <Stack.Screen name="send_statement" component={SendStatement} />
      <Stack.Screen name="support" component={Support} />
      <Stack.Screen name="change_pin" component={ChangePIN} />
    </Stack.Navigator>
  );
};

export default MainStack;
