import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Payments from '../screens/Payments';
import {
  HomeTabIcon,
  PaymentTabIcon,
  RewardTabIcon,
  UserTabIcon,
  WalletTabIcon,
} from '@icons';

const TabStack = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useTheme();
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#15151A',
        tabBarInactiveTintColor: '#15151A',
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
        },
      }}>
      <TabStack.Screen
        name="home"
        component={Payments}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeTabIcon color={focused ? '#1A75FD' : '#15151A'} />
          ),
        }}
      />
      <TabStack.Screen
        name="wallet"
        component={Payments}
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <WalletTabIcon color={focused ? '#15151A' : '#94A3B8'} />
          ),
        }}
      />
      <TabStack.Screen
        name="payments"
        component={Payments}
        options={{
          title: 'Payments',
          tabBarIcon: ({ focused }) => (
            <PaymentTabIcon color={focused ? '#1A75FD' : '#94A3B8'} />
          ),
        }}
      />
      <TabStack.Screen
        name="rewards"
        component={Payments}
        options={{
          tabBarIcon: ({ focused }) => (
            <RewardTabIcon color={focused ? '#1A75FD' : '#94A3B8'} />
          ),
        }}
      />
      <TabStack.Screen
        name="account"
        component={Payments}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserTabIcon color={focused ? '#1A75FD' : '#94A3B8'} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabs;
