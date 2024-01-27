import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Checkbox,
  Header,
  Input,
  RegularText,
  TitleText,
} from '@common';
import { updateOrder, useAppDispatch, useAppSelector } from '@store';
import { useStyles } from '../styles';
import { extractAmount, getImage, getUniqueID, moneyFormat } from '@utils';
import { IsBillProvider, OrderPayload } from '@types';

const AMOUNTS = ['100', '200', '500', '1000'];

const BuyAirtime = ({ navigation, route }) => {
  const userPhone = route.params.phone || '';
  const { airtime } = useAppSelector(state => state.bill);
  const [phone, setPhone] = useState(userPhone);
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<IsBillProvider>();
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const handleSelection = (text: string) => {
    setSelectedAmount(text);
    setAmount(text);
    const formatted = moneyFormat(text, 0);
    setCustomAmount(formatted);
  };

  const handleCustomAmount = (figure: string) => {
    setAmount(figure);
    const formatted = moneyFormat(figure, 0);
    setCustomAmount(formatted);
  };

  const onContinue = () => {
    const payload: OrderPayload = {
      orderPayload: {
        billCode: selectedNetwork?.billCode,
        merchantReference: getUniqueID(),
        paymentMode: 'purse',
        transactionReference: '',
        externalReference: '',
        payload: {
          mobileNumber: phone,
          amount: amount,
        },
      },
    };
    dispatch(updateOrder(payload));
    navigation.navigate('review_payment', {
      type: 'airtime',
      data: { selectedNetwork, amount, phone },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Airtime" centered />
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
          <Input
            placeholder="Amount"
            returnKeyType="done"
            value={customAmount}
            onChangeText={handleCustomAmount}
            keyboardType="number-pad"
            inputStyle={styles.input}
            // hasError
            // errorMessage="Your wallet balance is too low for this transaction."
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
                <RegularText
                  text={`₦${amt}`}
                  style={[
                    styles.selectorText,
                    selectedAmount === amt && styles.selectorTextActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.networks}>
            <RegularText
              text="Choose network"
              size={14}
              style={styles.networkTitle}
            />
            {airtime &&
              airtime.map((network, index) => (
                <View style={styles.network} key={index}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedNetwork(network)}
                    style={styles.row}>
                    <Image
                      source={getImage(network.billCode.toLowerCase())}
                      resizeMode="cover"
                      style={styles.networkLogo}
                    />
                    <TitleText text={network.billCode} size={11} />
                  </TouchableOpacity>
                  <Checkbox
                    isChecked={selectedNetwork?.billCode === network.billCode}
                    onPress={() => setSelectedNetwork(network)}
                  />
                </View>
              ))}
          </View>
        </View>
        <Button
          text="Continue"
          onPress={onContinue}
          disabled={!phone || !amount || !selectedNetwork}
        />
      </View>
    </View>
  );
};

export default BuyAirtime;
