/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeTabIcon,
  PaymentTabIcon,
  RewardTabIcon,
  UserTabIcon,
  WalletTabIcon,
} from '@icons';
import { useAppSelector } from '@store';
import Payments from '../screens/payments';
import Dashboard from '../screens/dashboard';
import Profile from '../screens/profile';

const TabStack = createBottomTabNavigator();

const BottomTabs = () => {
  const {
    colors: { colors },
  } = useAppSelector(state => state.misc);
  console.log('BottomTabs', colors);
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: 'DMSans-Regular',
          fontSize: 11,
          lineHeight: 16,
          color: colors.inputColor,
        },
        tabBarStyle: {
          paddingTop: 13,
          backgroundColor: colors.selector,
          borderTopColor: colors.selector,
        },
      }}>
      <TabStack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeTabIcon fill={focused ? '#FF6600' : 'none'} />
          ),
        }}
      />
      <TabStack.Screen
        name="wallet"
        component={Payments}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <WalletTabIcon fill={focused ? '#FF6600' : 'none'} />
          ),
        }}
      />
      <TabStack.Screen
        name="payments"
        component={Payments}
        options={{
          title: 'Payments',
          tabBarIcon: ({ focused }) => (
            <PaymentTabIcon fill={focused ? '#FF6600' : 'none'} />
          ),
        }}
      />
      <TabStack.Screen
        name="rewards"
        component={Payments}
        options={{
          tabBarIcon: ({ focused }) => (
            <RewardTabIcon fill={focused ? '#FF6600' : 'none'} />
          ),
        }}
      />
      <TabStack.Screen
        name="account"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserTabIcon fill={focused ? '#FF6600' : 'none'} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabs;
