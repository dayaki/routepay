import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useStyles } from '../styles';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { IsBillProvider } from '@types';
import { apiService, getUniqueID, postBundleLookup } from '@utils';

type Payload = {
  billCode: string;
  payload: any;
};

const BuyNetworkPins = ({ navigation, route }) => {
  const { data } = route.params;
  const [number, setNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<IsBillProvider>();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  console.log('pins', data);

  const handleSelection = (item: IsBillProvider) => {
    console.log('selected Network', item);
    setSelectedNetwork(item);
    lookupService(item.billCode);
  };

  const lookupService = async (code: string) => {
    const data2send: Payload = {
      billCode: code,
      payload: {},
    };
    if (code.includes('JAMB')) {
      data2send.payload.confirmationCode = number;
    }
    // console.log('payload for CableTV lookup', data2send);
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('PINs lookiup', response);
      // if (response.length) {
      //   setPlans(response);
      // } else {
      //   setCustomerData(response);
      //   setAmount(response.amount);
      //   setPlans(response.bouquets);
      // }
    } catch (error) {
      console.log('CableTV lookup err', error);
    }
  };

  const onContinue = () => {
    let payload;
    if (selectedNetwork?.billCode.includes('JAMB')) {
      payload = {
        billCode: selectedNetwork?.billCode,
        merchantReference: getUniqueID(),
        payload: {
          confirmationCode: '9678528341',
          mobileNumber: '08000000000',
          serviceType: 'DE',
          amount: '4700',
        },
      };
    } else {
      payload = {
        billCode: selectedNetwork?.billCode,
        merchantReference: getUniqueID(),
        payload: {
          quantity: 2,
          amount: '1000',
        },
      };
    }
    // console.log('payload', payload);
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'pin',
      data: {
        amount,
        selectedNetwork,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Network Pin" centered />
      <View style={styles.content}>
        <View>
          <Select
            selector="displayName"
            data={data}
            title="Select Network PIN"
            label="Network provider"
            selected={selectedNetwork}
            onSelect={handleSelection}
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
          onPress={onContinue}
          disabled={!quantity || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyNetworkPins;
