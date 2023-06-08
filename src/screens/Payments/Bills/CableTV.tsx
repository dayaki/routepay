import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Header,
  Input,
  NetworkSelect,
  RegularText,
  Select,
  TitleText,
} from '@common';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from '../styles';
import { IsBillProvider } from '@types';
import { apiService, nairaFormat, postBundleLookup } from '@utils';

type Payload = {
  billCode: string;
  payload: {
    smartcardNumber?: string | null;
  };
};

const CableTV = ({ navigation }) => {
  const { cable } = useAppSelector(state => state.bill);
  const { user } = useAppSelector(state => state.user);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<IsBillProvider>();
  const [plans, setPlans] = useState<[]>();
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const [bouquets, setBouquets] = useState<null | []>();
  const [selectedBouquet, setSelectedBouquet] = useState();
  const [customerData, setCustomerData] = useState<any>();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  // console.log('cable....', cable);

  React.useEffect(() => {
    if (selectedPlan) {
      setBouquets(selectedPlan.plans);
    }
    if (selectedPlan?.plans) {
      setAmount(selectedPlan.plans[0].amount);
    } else {
      setAmount(selectedPlan?.amount);
    }
    console.log('selectedPlan', selectedPlan);
  }, [selectedPlan]);

  const handleSelection = (data: IsBillProvider) => {
    console.log('selected Network', data);
    setSelectedNetwork(data);
    lookup(data.billCode);
    setSelectedPlan(null);
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
    // console.log('payload for CableTV lookup', data2send);
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('CableTV lookiup', response);
      if (response.length) {
        setPlans(response);
      } else {
        setCustomerData(response);
        setAmount(response.amount);
        setPlans(response.bouquets);
      }
    } catch (error) {
      console.log('CableTV lookup err', error);
    }
  };

  const onContinue = () => {
    let payload;
    if (selectedNetwork?.billCode.includes('SHOWMAX')) {
      payload = {
        mobileNumber: phone,
        validityPeriod: selectedPlan.validityPeriod,
        dataCode: selectedPlan.dataCode,
        amount: selectedPlan.amount,
      };
    } else if (selectedNetwork?.billCode.includes('DSTV_BOXOFFICE')) {
      payload = {
        customerName: customerData?.customerName,
        customerNumber: customerData.customerNumber,
        smartcardNumber: phone,
        paymentCycle: customerData.paymentCycle,
        amount: customerData.amount,
      };
    } else if (selectedNetwork?.billCode.includes('STARTIMES')) {
      payload = {
        smartcardNumber: phone,
        bouquetCode: selectedPlan.bouquetCode,
        amount: selectedPlan.amount,
      };
    } else if (selectedNetwork?.billCode.includes('GOTV')) {
      payload = {
        customerName: customerData?.customerName,
        customerNumber: customerData.customerNumber,
        smartcardNumber: phone,
        paymentCycle: '1',
        bouquetCode: selectedPlan.bouquetCode,
        amount: amount,
      };
    } else if (selectedNetwork?.billCode.includes('DSTV')) {
      payload = {
        customerName: customerData?.customerName,
        customerNumber: customerData.customerNumber,
        smartcardNumber: phone,
        paymentCycle: '1',
        bouquetCode: 'NNJ1E36',
        amount: '1635',
      };
    }
    // console.log('payload', payload);
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'cable',
      data: {
        number: phone,
        plan: selectedPlan.dataName,
        billCode: selectedNetwork?.billCode,
        amount: selectedPlan.amount,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Cable TV" centered />
      <View style={styles.content}>
        <View>
          <Input
            placeholder="Smartcard or phone number"
            value={phone}
            maxLength={11}
            onChangeText={setPhone}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            returnKeyType="done"
            inputStyle={styles.input}
          />
          <NetworkSelect
            data={cable}
            selector={
              selectedNetwork?.billCode.includes('SHOWMAX')
                ? 'dataName'
                : 'billCode'
            }
            title="Choose Package"
            label="Service provider"
            selected={selectedNetwork}
            onSelect={handleSelection}
          />
          {plans && plans.length && (
            <Select
              data={plans}
              selector={
                selectedNetwork?.billCode.includes('SHOWMAX')
                  ? 'dataName'
                  : 'bouquetName'
              }
              label="Subscription plan"
              title="Choose Subscription plan"
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />
          )}
          {/* {bouquets && bouquets.length > 0 && (
            <Select
              data={bouquets}
              selector={
                selectedNetwork?.billCode.includes('SHOWMAX')
                  ? 'dataName'
                  : 'bouquetName'
              }
              useLabel={
                selectedBouquet &&
                `${selectedBouquet.months}: ${selectedBouquet.amount}`
              }
              label="Select options"
              title="Choose Subscription plan"
              selected={selectedBouquet}
              onSelect={setSelectedBouquet}
            />
          )} */}
          <Input
            editable={false}
            placeholder="Amount"
            returnKeyType="done"
            value={nairaFormat(amount)}
            onChangeText={setAmount}
            keyboardType="number-pad"
            inputStyle={styles.input}
          />
          {customerData && (
            <View style={styles.review}>
              <View style={styles.reviewItem}>
                <RegularText text="Name" size={14} />
                <TitleText text={customerData.customerName} size={14} />
              </View>
              {/* <View style={styles.reviewItem}>
                <RegularText text="Number" size={14} />
                <TitleText text={customerData.customerNumber} size={14} />
              </View> */}
            </View>
          )}
        </View>
        <Button
          text="Continue"
          onPress={onContinue}
          disabled={!phone || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default CableTV;
