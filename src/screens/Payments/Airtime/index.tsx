import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Input, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { Header } from '../utils';

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

const BuyAirtime = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const styles = useStyles();

  const handleSelection = (text: string) => {
    setSelectedAmount(text);
    setAmount(text);
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Airtime" centered />
      <View style={styles.content}>
        <View>
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
          <View style={styles.selector}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.selectorBox,
                selectedAmount === '100' && styles.selectorActive,
              ]}
              onPress={() => handleSelection('100')}>
              <RegularText text="₦100" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.selectorBox,
                selectedAmount === '200' && styles.selectorActive,
              ]}
              onPress={() => handleSelection('200')}>
              <RegularText text="₦200" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.selectorBox,
                selectedAmount === '500' && styles.selectorActive,
              ]}
              onPress={() => handleSelection('500')}>
              <RegularText text="₦500" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.selectorBox,
                selectedAmount === '1000' && styles.selectorActive,
              ]}
              onPress={() => handleSelection('1000')}>
              <RegularText text="₦1000" />
            </TouchableOpacity>
          </View>

          <View style={styles.networks}>
            <RegularText
              text="Choose network"
              size={14}
              style={styles.networkTitle}
            />
            {NETWORKS.map(network => (
              <View style={styles.network} key={network.id}>
                <View style={styles.row}>
                  <Image
                    source={network.image}
                    resizeMode="cover"
                    style={styles.networkLogo}
                  />
                  <TitleText text={network.name} size={11} />
                </View>
                <Checkbox
                  isChecked={selectedNetwork === network.slug}
                  onPress={() => setSelectedNetwork(network.slug)}
                />
              </View>
            ))}
          </View>
        </View>
        <Button
          text="Continue"
          onPress={() => {}}
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyAirtime;
