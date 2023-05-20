import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Input, RegularText, TitleText } from '@common';
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

const BuyAirtime = ({ navigation }) => {
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
            hasError
            errorMessage="Your wallet balance is too low for this transaction."
          />
          <View style={styles.selector}>
            {AMOUNTS.map((amt, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  styles.selectorBox,
                  selectedAmount === amt && styles.selectorActive,
                ]}
                onPress={() => handleSelection(amt)}>
                <RegularText text={`₦${amt}`} style={styles.selectorText} />
              </TouchableOpacity>
            ))}
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
          onPress={() => navigation.navigate('review_payment')}
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyAirtime;
