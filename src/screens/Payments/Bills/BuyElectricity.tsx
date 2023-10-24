import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, RegularText, Select, TitleText } from '@common';
import { useStyles } from '../styles';
import { newOrder, useAppDispatch, useAppSelector } from '@store';
import { IsBillProvider, OrderPayload } from '@types';
import { apiService, getUniqueID, moneyFormat, postBundleLookup } from '@utils';

type Payload = {
  billCode: string;
  payload: {
    customerNumber?: string | null;
  };
};

const BuyElectricity = ({ navigation, route }) => {
  const { user } = useAppSelector(state => state.user);
  const data = route.params.data;
  const [meter, setMeter] = useState('');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<IsBillProvider>();
  const [customerData, setCustomerData] = useState<any>();
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const handleCustomAmount = (figure: string) => {
    setAmount(figure);
    const formatted = moneyFormat(figure, 0);
    setCustomAmount(formatted);
  };

  const handleSelection = (item: IsBillProvider) => {
    setSelectedCompany(item);
    lookup(item.billCode);
  };

  const lookup = async (code: string) => {
    console.log('BuyElectricity billCode', code);
    const data2send: Payload = {
      billCode: code,
      payload: {
        customerNumber: meter,
      },
    };
    console.log('payload for BuyElectricity lookup', data2send);
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('BuyElectricity lookiup', response);
      setCustomerData(response);
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

  const onContinue = async () => {
    const payload: OrderPayload = {
      orderPayload: {
        billCode: selectedCompany?.billCode,
        merchantReference: getUniqueID(),
        payload: {
          mobileNumber: user?.phoneNumber,
          customerEmail: user?.email,
          customerName: customerData.customerName,
          address: customerData.address,
          districtNumber: customerData.districtNumber,
          customerNumber:
            customerData.customerNumber !== ''
              ? customerData.customerNumber
              : meter,
          amount: amount,
        },
      },
      orderData: {
        company: selectedCompany.displayName,
      },
    };
    dispatch(newOrder(payload));
    navigation.navigate('review_payment', {
      type: 'electricity',
      data: {
        amount,
        meter,
        company: selectedCompany.displayName,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Electricity" centered />
      <View style={styles.content}>
        <View>
          <Input
            placeholder="Meter number"
            value={meter}
            maxLength={15}
            onChangeText={setMeter}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            returnKeyType="done"
            inputStyle={styles.input}
          />
          <Select
            data={data}
            selector="displayName"
            title="Choose Service Provider"
            label="Electricity company"
            selected={selectedCompany}
            onSelect={handleSelection}
            onSelection={handleSelection}
          />
          <Input
            placeholder="Amount"
            returnKeyType="done"
            value={customAmount}
            onChangeText={handleCustomAmount}
            keyboardType="number-pad"
            inputStyle={styles.input}
          />
          {customerData && (
            <View style={styles.review}>
              <View style={styles.reviewItem}>
                <RegularText text="Name" size={14} />
                <TitleText text={customerData.customerName} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Address" size={14} />
                <TitleText text={customerData.address} size={14} />
              </View>
            </View>
          )}
        </View>
        <Button
          text="Continue"
          onPress={onContinue}
          disabled={!meter || !amount || !selectedCompany}
        />
      </View>
    </View>
  );
};

export default BuyElectricity;
