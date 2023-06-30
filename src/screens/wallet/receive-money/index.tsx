import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header, RegularText } from '@common';
import { useStyles } from '../styles';
import { ChevronForward } from '@icons';
import { useAppSelector } from '@store';
import { useToast } from 'react-native-toast-notifications';

const ReceiveMoney = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();
  const toast = useToast();

  return (
    <View style={styles.container}>
      <Header title="Receive Money" centered hideBalance />
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendWrapper}
          onPress={
            () => toast.show('Coming soon....')
            // navigation.navigate('route_link')
          }>
          <View style={styles.sendRow}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/routepay_dark.png')
                  : require('@images/wallet/routepay.png')
              }
              resizeMode="cover"
              style={styles.beneficiaryIcon}
            />
            <RegularText text="Receive via Routepay payment link" size={14} />
          </View>
          <ChevronForward />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReceiveMoney;
