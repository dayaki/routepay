import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Header,
  Input,
  RegularText,
  TextCounter,
  TitleText,
} from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';

const PayBeneficiary = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('GTBank');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [userData, setUserData] = useState();
  const [hasUser, setHasUser] = useState(false);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Send Money" centered />
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 40,
        }}>
        <View>
          <View style={styles.beneficiaryBox}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/bank_dark.png')
                  : require('@images/wallet/bank.png')
              }
              resizeMode="cover"
              style={styles.beneficiaryIcon}
            />
            <TitleText
              text="Ayodeji Subair"
              size={14}
              style={{ marginBottom: 5, marginTop: 10 }}
            />
            <RegularText text="GTbank - 0123456789" size={11} />
          </View>
          <Input
            value={amount}
            onChangeText={setAmount}
            returnKeyType="done"
            keyboardType="number-pad"
            placeholder="Amount"
          />
          <Input
            value={memo}
            onChangeText={setMemo}
            placeholder="Remark"
            maxLength={40}
            rightIcon={<TextCounter text={memo} />}
          />
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('review_payment', {
              type: 'bank_payment',
              data: {
                accountNumber: '08123456789',
                bankName: 'Guaranty trust',
                accountName: 'Ayodeji Subair',
                remark: memo,
                amount,
              },
            })
          }
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PayBeneficiary;
