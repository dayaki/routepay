import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  DataSelect,
  Header,
  Input,
  NetworkSelect,
  RegularText,
  TitleText,
} from '@common';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from '../styles';
import { IsBillProvider, IsDataPlan, OrderPayload } from '@types';
import {
  apiService,
  extractAmount,
  getUniqueID,
  nairaFormat,
  postBundleLookup,
} from '@utils';

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
    setSelectedNetwork(data);
    lookup(data.billCode);
    setSelectedData([]);
  };

  const lookup = async (code: string) => {
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
      setDataPlans(response);
    } catch (error) {
      console.log('lookup err', error);
    }
  };

  const onContinue = () => {
    let payload: OrderPayload = {
      orderPayload: {
        billCode: selectedNetwork?.billCode,
        dataCode: selectedData?.dataCode,
        merchantReference: getUniqueID(),
        transactionReference: getUniqueID(),
        externalReference: '',
        payload: {
          mobileNumber: phone,
          amount: selectedData?.amount || amount,
          dataCode: selectedData?.dataCode,
        },
      },
      orderData: {
        plan: selectedData?.dataName,
      },
    };
    if (selectedNetwork?.billCode === 'SPECTRANET') {
      payload.orderPayload = {
        billCode: selectedNetwork.billCode,
        merchantReference: getUniqueID(),
        transactionReference: getUniqueID(10),
        externalReference: '',
        payload: {
          accountNumber: dataPlans.accountNumber,
          customerName: dataPlans.customerName,
          planId: dataPlans.planId,
          amount: amount,
        },
      };
    } else if (selectedNetwork?.billCode === 'SMILE') {
      payload.orderPayload = {
        billCode: 'SMILE',
        merchantReference: getUniqueID(),
        transactionReference: getUniqueID(10),
        externalReference: '',
        payload: {
          mobileNumber: userPhone,
          amount: amount,
        },
      };
    }
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'data',
      data: {
        phone,
        selectedNetwork,
        amount: selectedData?.amount || amount,
        data_plan: selectedData?.dataName || 'N/A',
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
            data={bundle?.filter(elem => !elem.billCode.includes('SPEC')) || []}
            selected={selectedNetwork}
            onSelect={data => handleSelection(data)}
          />
          {dataPlans &&
            (Array.isArray(dataPlans) ? (
              <>
                <DataSelect
                  networkName={selectedNetwork?.billCode || ''}
                  data={dataPlans || []}
                  title="Choose Data Plan"
                  label="Data plan"
                  selectedNetwork={selectedData}
                  selectedPlan={selectedData}
                  onSelect={data => setSelectedData(data)}
                />
                <Input
                  placeholder="Amount"
                  returnKeyType="done"
                  value={nairaFormat(selectedData?.amount || 0)}
                  editable={false}
                  keyboardType="number-pad"
                  inputStyle={styles.input}
                />
              </>
            ) : (
              <>
                <View style={[styles.review, { marginBottom: 24 }]}>
                  <View style={styles.reviewItem}>
                    <RegularText text="Name" size={14} />
                    <TitleText text={dataPlans?.customerName} size={14} />
                  </View>
                  {dataPlans.accountNumber && (
                    <View style={styles.reviewItem}>
                      <RegularText text="Number" size={14} />
                      <TitleText text={dataPlans?.accountNumber} size={14} />
                    </View>
                  )}
                </View>
                <Input
                  placeholder="Amount"
                  returnKeyType="done"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                  inputStyle={styles.input}
                />
              </>
            ))}
        </View>
        {Array.isArray(dataPlans) ? (
          <Button
            text="Continue"
            onPress={onContinue}
            disabled={
              !phone ||
              !selectedNetwork ||
              !selectedData ||
              !selectedData.amount
            }
          />
        ) : (
          <Button
            text="Continue"
            onPress={onContinue}
            disabled={!phone || !selectedNetwork || !amount}
          />
        )}
      </View>
    </View>
  );
};

export default BuyData;
