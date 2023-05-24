import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Select } from '@common';
import { useStyles } from './styles';
import { Header } from './utils';

const BuyFuel = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState('');
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Buy Fuel" centered />
      <View style={styles.content}>
        <View>
          <Select
            label="Select filling station"
            selected={selectedStation}
            onSelect={setSelectedStation}
          />
          <Input
            placeholder="Phone number"
            value={phone}
            maxLength={11}
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
              data: {
                amount,
                phone,
                station: 'RAINOIL',
                email: 'janedoe@gmail.com',
              },
            })
          }
          disabled={!phone || !amount || !selectedStation}
        />
      </View>
    </View>
  );
};

export default BuyFuel;
