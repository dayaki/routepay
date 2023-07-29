import React, { useState, useEffect } from 'react';
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
import { IsBillProvider, OrderPayload } from '@types';
import { apiService, getUniqueID, nairaFormat, postBundleLookup } from '@utils';

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

  useEffect(() => {
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
    try {
      const { response } = await apiService(
        postBundleLookup,
        'post',
        data2send,
      );
      console.log('CableTV lookiup', response);
      if (code === 'DSTV_BOXOFFICE') {
        setSelectedPlan([]);
      }
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
    let dataPayload: OrderPayload;
    let navData;
    if (selectedNetwork?.billCode.includes('SHOWMAX')) {
      dataPayload = {
        orderPayload: {
          billCode: selectedNetwork.billCode,
          merchantReference: getUniqueID(),
          payload: {
            mobileNumber: phone,
            validityPeriod: selectedPlan.validityPeriod,
            dataCode: selectedPlan.dataCode,
            amount: selectedPlan.amount,
          },
        },
        orderData: { company: 'Showmax' },
      };
      dispatch(newOrder(dataPayload));
      navData = {
        number: phone,
        plan: selectedPlan.dataName,
        billCode: selectedNetwork?.billCode,
        amount: selectedPlan.amount,
      };
    } else if (selectedNetwork?.billCode.includes('DSTV_BOXOFFICE')) {
      dataPayload = {
        orderPayload: {
          billCode: selectedNetwork.billCode,
          merchantReference: getUniqueID(),
          payload: {
            customerName: customerData?.customerName,
            customerNumber: customerData.customerNumber,
            smartcardNumber: phone,
            paymentCycle: customerData.paymentCycle,
            amount: customerData.amount,
          },
        },
        orderData: { company: 'Dstv BoxOffice' },
      };
      dispatch(newOrder(dataPayload));
      navData = {
        number: customerData.customerNumber || phone,
        plan: 'DSTV Box Office',
        billCode: selectedNetwork?.billCode,
        amount: customerData.amount,
      };
    } else if (selectedNetwork?.billCode.includes('STARTIMES')) {
      dataPayload = {
        orderPayload: {
          billCode: selectedNetwork.billCode,
          merchantReference: getUniqueID(),
          payload: {
            smartcardNumber: phone,
            bouquetCode: selectedPlan.bouquetCode,
            amount: selectedPlan.amount,
          },
        },
        orderData: {
          company: 'Startimes',
        },
      };
      dispatch(newOrder(dataPayload));
      navData = {
        number: phone,
        plan: selectedPlan.bouquetName,
        billCode: selectedNetwork?.billCode,
        amount: selectedPlan.amount,
      };
    } else if (selectedNetwork?.billCode.includes('GOTV')) {
      dataPayload = {
        orderPayload: {
          billCode: selectedNetwork.billCode,
          merchantReference: getUniqueID(),
          payload: {
            customerName: customerData?.customerName,
            customerNumber: customerData.customerNumber,
            smartcardNumber: phone,
            paymentCycle: customerData.paymentCycle,
            bouquetCode: selectedPlan.bouquetCode,
            amount: amount,
          },
        },
        orderData: {
          company: 'GoTv',
        },
      };
      dispatch(newOrder(dataPayload));
      navData = {
        number: phone,
        plan: selectedPlan.bouquetName,
        billCode: selectedNetwork?.billCode,
        amount: amount,
      };
    } else if (selectedNetwork?.billCode.includes('DSTV')) {
      dataPayload = {
        orderPayload: {
          billCode: selectedNetwork.billCode,
          merchantReference: getUniqueID(),
          payload: {
            customerName: customerData?.customerName,
            customerNumber: customerData.customerNumber,
            smartcardNumber: phone,
            paymentCycle: customerData.paymentCycle,
            bouquetCode: selectedPlan.bouquetCode,
            amount: amount,
          },
        },
        orderData: {
          company: 'Dstv',
        },
      };
      dispatch(newOrder(dataPayload));
      navData = {
        number: phone,
        plan: selectedPlan.bouquetName,
        billCode: selectedNetwork?.billCode,
        amount: amount,
      };
    }
    navigation.navigate('review_payment', {
      type: 'cable',
      data: navData,
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
            largeIcon
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
          disabled={!phone || !selectedNetwork || !selectedPlan || !amount}
        />
      </View>
    </View>
  );
};

export default CableTV;
