import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useStyles } from '../styles';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { IsBillProvider, OrderPayload } from '@types';
import { apiService, getUniqueID, moneyFormat, postBundleLookup } from '@utils';

type Payload = {
  billCode: string;
  payload: any;
};

const BuyNetworkPins = ({ navigation, route }) => {
  const { data, title } = route.params;
  const { user } = useAppSelector(state => state.user);
  const [plans, setPlans] = useState();
  const [selectedPin, setSelectedPin] = useState();
  const [number, setNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<IsBillProvider>();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (quantity.length > 0) {
      const tempAmount = Number(selectedPin.amount) * Number(quantity);
      setAmount(tempAmount.toString());
      const formatted = moneyFormat(tempAmount, 0);
      setCustomAmount(formatted);
    }
  }, [quantity, selectedPin]);

  const handleCustomAmount = (figure: string) => {
    setAmount(figure);
    const formatted = moneyFormat(figure, 0);
    setCustomAmount(formatted);
  };

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
      setPlans(response);
    } catch (error) {
      console.log('CableTV lookup err', error);
    }
  };

  const onContinue = () => {
    let payload: OrderPayload = {
      orderPayload: {},
      orderData: {
        quantity: quantity,
        network: selectedNetwork,
        type: selectedNetwork?.billCode.includes('JAMB') ? 'waec' : 'recharge',
      },
    };
    if (selectedNetwork?.billCode.includes('JAMB')) {
      payload.orderPayload = {
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
      payload.orderPayload = {
        billCode: selectedNetwork?.billCode,
        merchantReference: getUniqueID(),
        transactionReference: getUniqueID(10),
        externalReference: '',
        payload: {
          quantity: Number(quantity),
          amount: amount,
        },
      };
    }
    // console.log('payload', payload);
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'pin',
      data: {
        phone: user?.phoneNumber,
        quantity,
        amount,
        selectedNetwork,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title={title ? 'Buy Exam Pin' : 'Buy Network Pin'} centered />
      <View style={styles.content}>
        <View>
          <Select
            selector="displayName"
            data={data}
            title={title ? 'Select Exam Provider' : 'Select Network PIN'}
            label={title ? 'Exam Provider' : 'Network provider'}
            selected={selectedNetwork}
            onSelect={handleSelection}
            onSelection={handleSelection}
          />
          <Select
            title="Available PINs - Amount"
            label="Available pins"
            data={plans}
            noName
            selector="amount"
            useLabel="amount"
            selected={selectedPin}
            onSelect={setSelectedPin}
            onSelection={setSelectedPin}
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
            value={customAmount}
            editable={false}
            onChangeText={handleCustomAmount}
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
