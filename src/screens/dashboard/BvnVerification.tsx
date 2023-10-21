import { RegularText, useTheme } from '@common';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useAppSelector } from '@store';
import { apiService, postCreateWallet } from '@utils';

const BVNVerification = ({ navigation, route }) => {
  const { data } = route.params;
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();

  useEffect(() => {
    createWallet();
  }, []);

  const createWallet = async () => {
    try {
      await apiService(postCreateWallet, 'post', {
        externalId: user?.phoneNumber,
        walletType: 'USER',
        firstName: user?.firstName,
        lastName: user?.lastName,
        bvn: data.bvn,
        gender: data.gender === 'male' ? 1 : 0,
        dob: data.dob,
      });
      navigation.navigate('wallet_confirmation');
    } catch (error: any) {
      console.log('create wallet Err', error);
      Alert.alert('Error Encountered', error.title);
      navigation.navigate('home');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#000" />
      <RegularText text="Creating your wallet, please wait..." />
    </View>
  );
};

export default BVNVerification;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
};
