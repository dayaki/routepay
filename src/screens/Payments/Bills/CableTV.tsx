import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, Select } from '@common';
import { useAppSelector } from '@store';
import { useStyles } from '../styles';
import { IsBillProvider } from '@types';
import { apiService, postBundleLookup } from '@utils';

type Payload = {
  billCode: string;
  payload: {
    smartcardNumber?: string | null;
  };
};

const CableTV = ({ navigation }) => {
  const { cable } = useAppSelector(state => state.bill);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<IsBillProvider>();
  const [selectedPlan, setSelectedPlan] = useState<[]>();
  const [plans, setPlans] = useState<[]>();
  const styles = useStyles();

  console.log('cable....', cable);

  const handleSelection = (data: IsBillProvider) => {
    console.log('selected Network', data);
    setSelectedNetwork(data);
    lookup(data.billCode);
    setSelectedPlan([]);
  };

  const lookup = async (code: string) => {
    console.log('CableTV billCode', code);
    const data2send: Payload = {
      billCode: code,
      payload: {},
    };
    if (!code.includes('SHOWMAX_VOUCHER')) {
      data2send.payload.smartcardNumber = phone;
    }
    console.log('payload for CableTV lookup', data2send);
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('CableTV lookiup', response);
      setPlans(response);
    } catch (error) {
      console.log('CableTV lookup err', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cable TV" centered />
      <View style={styles.content}>
        <View>
          <Select
            data={cable}
            selector="billCode"
            title="Choose Package"
            label="Service provider"
            selected={selectedNetwork}
            onSelect={handleSelection}
          />
          {plans && plans.length && (
            <Select
              data={plans}
              selector="dataName"
              label="Subscription plan"
              title="Choose Subscription plan"
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />
          )}
          <Input
            placeholder="Smart Card Number"
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
              type: 'cable',
              data: {
                smartcardNumber: phone,
                amount,
              },
            })
          }
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default CableTV;
