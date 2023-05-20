import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Checkbox,
  DataSelect,
  Input,
  RegularText,
  Select,
  TitleText,
} from '@common';
import { useStyles } from './styles';
import { Header } from './utils';

const NETWORKS = [
  {
    id: 1,
    name: 'Airtel',
    slug: 'airtel',
    image: require('@images/networks/airtel.png'),
  },
  {
    id: 2,
    name: 'MTN',
    slug: 'mtn',
    image: require('@images/networks/mtn.png'),
  },
  {
    id: 3,
    name: '9mobile',
    slug: '9mobile',
    image: require('@images/networks/9mobile.png'),
  },
  {
    id: 4,
    name: 'Glo',
    slug: 'glo',
    image: require('@images/networks/glo.png'),
  },
];

const AMOUNTS = ['100', '200', '500', '1000'];

const BuyData = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const styles = useStyles();

  const handleSelection = (text: string) => {
    setSelectedAmount(text);
    setAmount(text);
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Data" centered />
      <View style={styles.content}>
        <View>
          <Select
            label="Network provider"
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
          <DataSelect
            label="Data plan"
            selected={selectedData}
            onSelect={setSelectedData}
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
              data_plan: '2GB for Monthly - Monthly',
            })
          }
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyData;
