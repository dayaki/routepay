import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthStackParamList } from '@types';
import Payments from '../screens/Payments';
import BuyAirtime from '../screens/Payments/Airtime';
import BottomTabs from './BottomTabs';

// const Stack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={BottomTabs} />
      <Stack.Screen name="payments" component={Payments} />
      <Stack.Screen name="buy_airtime" component={BuyAirtime} />
    </Stack.Navigator>
  );
};

export default MainStack;
