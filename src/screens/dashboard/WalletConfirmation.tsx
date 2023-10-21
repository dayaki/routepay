import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { Button, TitleText } from '@common';
import { apiService, getProfile } from '@utils';
import { updateUser, useAppDispatch, useAppSelector } from '@store';
import { useWelcomeStyles } from '../auth/styles';

const WalletConfirmation = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch(0);
  const styles = useWelcomeStyles();

  useEffect(() => {
    queryProfile();
  }, []);

  const queryProfile = async () => {
    if (user) {
      try {
        const response = await apiService(getProfile(user?.userId), 'get');
        dispatch(updateUser(response));
      } catch (error) {}
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.waveWrapper}>
        <Image
          source={require('@images/brand_waves_inverse.png')}
          resizeMode="cover"
          style={styles.wavess}
        />
        <View style={styles.imageWraper}>
          <Image
            source={require('@images/success/success_1.png')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.sliders}>
        <TitleText
          size={20}
          text="Your Wallet is now active!"
          style={styles.welcomeTitle}
        />
        <Text style={styles.welcomeText}>
          You have successfully created your RoutePay wallet. You can now topup
          your wallet and select wallet as a mode of payment.
        </Text>
        <Button text="Continue" onPress={() => navigation.navigate('home')} />
      </View>
    </View>
  );
};

export default WalletConfirmation;
