import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Select } from '@common';
import { useStyles } from './styles';
import { Header } from './utils';

const BuyFuel = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Buy Fuel" centered />
      <View style={styles.content}>
        <View>
          <Select
            label="Select filling station"
            selected={selectedNetwork}
            onSelect={setSelectedNetwork}
          />
          <Input
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            returnKeyType="done"
            inputStyle={styles.input}
          />
          <Input
            placeholder="Amount"
            returnKeyType="done"
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            inputStyle={styles.input}
          />
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('review_payment', {
              type: 'fuel',
              data_plan: '2GB for Monthly - Monthly',
            })
          }
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyFuel;
