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
import Wallet from '../screens/wallet';
import Rewards from '../screens/rewards';
import { Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabStack = createBottomTabNavigator();

const BottomTabs = () => {
  const {
    colors: { colors },
    theme,
  } = useAppSelector(state => state.misc);

  const getColor = () => {
    const color = theme === 'light' ? '#F9F7F6' : '#1F1F23';
    const text = theme === 'light' ? '#15151A' : '#F9F7F6';
    console.log('colordsss THEME', theme, color, text);
    return { color, text };
  };

  const insets = useSafeAreaInsets();
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: 'DMSans-Regular',
          fontSize: 11,
          lineHeight: 16,
          color: getColor().text,
        },
        tabBarStyle: {
          paddingTop: 13,
          backgroundColor: getColor().color,
          borderTopColor: getColor().color,
          // paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
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
        component={Wallet}
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
        component={Rewards}
        options={{
          tabBarButton: props => <Pressable {...props} disabled />,
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
