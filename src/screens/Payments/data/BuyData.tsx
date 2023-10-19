import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, DataSelect, Header, Input, NetworkSelect } from '@common';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from '../styles';
import { IsBillProvider, IsDataPlan, OrderPayload } from '@types';
import { apiService, getUniqueID, nairaFormat, postBundleLookup } from '@utils';

const BuyData = ({ navigation, route }) => {
  const userPhone = route.params.phone || '';
  const { bundle } = useAppSelector(state => state.bill);
  const [phone, setPhone] = useState(userPhone);
  const [amount, setAmount] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<
    IsBillProvider | undefined
  >();
  const [dataPlans, setDataPlans] = useState<IsDataPlan[]>();
  const [selectedData, setSelectedData] = useState<IsDataPlan>();
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const handleSelection = (data: IsBillProvider) => {
    console.log('selected Networked', data);
    setSelectedNetwork(data);
    lookup(data.billCode);
    setSelectedData([]);
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
    console.log('payload for lookup', data2send);
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

  const onContinue = () => {
    const payload: OrderPayload = {
      orderPayload: {
        billCode: selectedNetwork?.billCode,
        merchantReference: getUniqueID(),
        payload: {
          mobileNumber: phone,
          amount: selectedData?.amount,
          dataCode: selectedData?.dataCode,
        },
      },
      orderData: {
        plan: selectedData?.dataName,
      },
    };
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'data',
      data: {
        phone,
        selectedNetwork,
        amount: selectedData?.amount,
        data_plan: selectedData?.dataName,
      },
    });
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
          {dataPlans && dataPlans.length && (
            <DataSelect
              networkName={selectedNetwork?.billCode || ''}
              data={dataPlans || []}
              title="Choose Data Plan"
              label="Data plan"
              selectedNetwork={selectedData}
              selectedPlan={selectedData}
              onSelect={data => setSelectedData(data)}
            />
          )}
          <Input
            placeholder="Amount"
            returnKeyType="done"
            value={nairaFormat(selectedData?.amount || 0)}
            editable={false}
            keyboardType="number-pad"
            inputStyle={styles.input}
          />
        </View>
        <Button
          text="Continue"
          onPress={onContinue}
          disabled={
            !phone || !selectedNetwork || !selectedData || !selectedData.amount
          }
        />
      </View>
    </View>
  );
};

export default BuyData;
