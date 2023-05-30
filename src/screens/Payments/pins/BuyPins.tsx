import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';

const BuyNetworkPins = ({ navigation }) => {
  const { pins } = useAppSelector(state => state.bill);
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const styles = useStyles();
  console.log('pins', pins);

  return (
    <View style={styles.container}>
      <Header title="Buy Network Pin" centered />
      <View style={styles.content}>
        <View>
          <Select
            selector="billCode"
            data={pins}
            title="Select Network PIN"
            label="Network provider"
            selected={selectedNetwork}
            onSelect={setSelectedNetwork}
          />
          <Select
            label="Available pins"
            selected={selectedNetwork}
            onSelect={setSelectedNetwork}
          />
          <Input
            placeholder="Quantity of pins"
            value={quantity}
            onChangeText={setQuantity}
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
              type: 'pin',
              data: {
                amount,
                selectedNetwork,
              },
            })
          }
          disabled={!quantity || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyNetworkPins;
