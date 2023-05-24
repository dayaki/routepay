import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, DataSelect, Input, NetworkSelect } from '@common';
import { useAppSelector } from '@store';
import { useStyles } from '../styles';
import { Header } from '../utils';
import { IsBillProvider, IsDataPlan } from '@types';
import { apiService, postBundleLookup } from '@utils';

const BuyData = ({ navigation }) => {
  const { bundle } = useAppSelector(state => state.bill);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<
    IsBillProvider | undefined
  >();
  const [dataPlans, setDataPlans] = useState<IsDataPlan[]>();
  const [selectedData, setSelectedData] = useState<IsDataPlan>();
  const styles = useStyles();

  const handleSelection = (data: IsBillProvider) => {
    setSelectedNetwork(data);
    lookup(data.billCode);
  };

  const lookup = async (code: string) => {
    console.log('billCode', code);
    const data2send: {
      billCode: string;
      payload: { accountNumber?: string };
    } = {
      billCode: code,
      payload: {},
    };
    if (
      !(
        code.toLowerCase().includes('mtn') ||
        code.toLowerCase().includes('glo') ||
        code.toLowerCase().includes('airtel') ||
        code.toLowerCase().includes('etisalat')
      )
    ) {
      data2send.payload.accountNumber = phone;
    }
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('lookiup', response);
      setDataPlans(response);
    } catch (error) {
      console.log('lookup err', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Data" centered />
      <View style={styles.content}>
        <View>
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
          <NetworkSelect
            title="Choose Network Provider"
            label="Network provider"
            data={bundle || []}
            selected={selectedNetwork}
            onSelect={data => handleSelection(data)}
          />
          <DataSelect
            networkName={selectedNetwork?.billCode || ''}
            data={dataPlans || []}
            title="Choose Data Plan"
            label="Data plan"
            selectedNetwork={selectedData}
            onSelect={data => setSelectedData(data)}
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
              type: 'data',
              data: {
                phone,
                selectedNetwork,
                amount,
                data_plan: '2GB for Monthly - Monthly',
              },
            })
          }
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyData;
