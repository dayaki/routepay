import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useStyles } from './styles';
import { useAppSelector } from '@store';

const BuyFuel = ({ navigation }) => {
  const { fuel } = useAppSelector(state => state.bill);
  const { user } = useAppSelector(state => state.user);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState('');
  const styles = useStyles();
  console.log('fuel', fuel);

  return (
    <View style={styles.container}>
      <Header title="Buy Fuel" centered />
      <View style={styles.content}>
        <View>
          <Select
            selector="fuelStation"
            data={fuel}
            label="Select filling station"
            title="Choose Filling Station"
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
                station: selectedStation,
                email: user?.email,
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
