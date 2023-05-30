import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useStyles } from '../styles';

const BuyElectricity = ({ navigation }) => {
  const [meter, setMeter] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const styles = useStyles();

  const handleSelection = (text: string) => {
    setSelectedAmount(text);
    setAmount(text);
  };

  return (
    <View style={styles.container}>
      <Header title="Cable TV" centered />
      <View style={styles.content}>
        <View>
          <Select
            label="Electricity company"
            selected={selectedCompany}
            onSelect={setSelectedCompany}
          />
          <Input
            placeholder="Meter number"
            value={meter}
            maxLength={11}
            onChangeText={setMeter}
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
              type: 'electricity',
              data: {
                amount,
                meter,
              },
            })
          }
          disabled={!meter || !amount || !selectedCompany}
        />
      </View>
    </View>
  );
};

export default BuyElectricity;
