import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="onboarding">
      {/* <Stack.Screen name="onboarding" component={Onboarding} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
