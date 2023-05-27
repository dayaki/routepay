import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Button,
  Header,
  Input,
  RegularText,
  Select,
  TextCounter,
} from '@common';
import { useStyles } from '../styles';

const BankPayment = ({ navigation }) => {
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
          <RegularText
            text="Please provide the details of the account you would like to send money to below"
            size={14}
            style={{ lineHeight: 25, marginBottom: 30 }}
          />
          <Input
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            placeholder="Account number"
            returnKeyType="done"
            maxLength={10}
          />
          {accountNumber.length === 10 && (
            <Select
              label="What bank?"
              selected={selectedBank}
              onSelect={setSelectedBank}
            />
          )}
          {accountNumber.length === 10 && selectedBank && (
            <>
              <Input
                editable={false}
                value={'Ayodeji Subair'}
                onChangeText={setAmount}
                placeholder="Account number"
              />
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
              <View style={styles.beneficiary}>
                <RegularText text="Save as Beneficiary?" size={14} />
                <ToggleSwitch
                  isOn={saveBeneficiary}
                  onColor="#008751"
                  offColor="#FF6600"
                  size="small"
                  onToggle={setSaveBeneficiary}
                />
              </View>
            </>
          )}
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

export default BankPayment;
