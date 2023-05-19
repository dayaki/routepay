import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, RegularText } from '@common';
import { useStyles } from './styles';
import { Header } from './utils';

const PaymentOptions = ({ navigation }) => {
  const [selectionOption, setSelectionOption] = useState('wallet');
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Payment Options" centered hideBalance />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Pay with wallet"
              isChecked={selectionOption === 'wallet'}
              onPress={() => setSelectionOption('wallet')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Pay with card"
              isChecked={selectionOption === 'card'}
              onPress={() => setSelectionOption('card')}
            />
          </View>
        </View>
        <View>
          <Button
            text="Continue payment"
            onPress={() => navigation.navigate('wallet_pin')}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentOptions;
