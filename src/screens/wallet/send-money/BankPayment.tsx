import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
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
import { apiService, postVerifyBank } from '@utils';

type BankAccountData = {
  verificationId: string | null;
  beneficiaryAccountNumber: string | null;
  beneficiaryAccountName: string | null;
  bankCode: string | null;
  bvn: string | null;
};

const BankPayment = ({ navigation }) => {
  const [banks, setBanks] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userData, setUserData] = useState<BankAccountData>();
  const [hasErrors, setHasErrors] = useState('');
  const styles = useStyles();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    const resp = await fetch('https://nigerianbanks.xyz/');
    const tempBanks = await resp.json();
    setBanks(tempBanks);
  };

  const accountLookup = async (selected: any) => {
    setIsFetching(true);
    try {
      const resp = await apiService(postVerifyBank, 'post', {
        transferType: 'account',
        accountNumber: accountNumber,
        bankCode: selected.code,
      });
      console.log('accountLookup', resp);
      setUserData(resp);
    } catch (error) {
      setHasErrors('Account information not found.');
      console.log('accountLookup err', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Send Money" centered />
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={styles.containerStyle}>
        <View>
          <RegularText
            text="Please provide the details of the account you would like to send money to below"
            size={14}
            style={styles.label}
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
              data={banks}
              selector="name"
              label="What bank?"
              selected={selectedBank}
              onSelect={setSelectedBank}
              onSelection={val => accountLookup(val)}
            />
          )}

          {isFetching && <ActivityIndicator size="small" color="#000" />}
          {!!hasErrors && !isFetching && (
            <RegularText
              text={hasErrors}
              color="red"
              size={14}
              style={styles.error}
            />
          )}
          {userData && userData.beneficiaryAccountNumber && !isFetching && (
            <>
              <Input
                editable={false}
                value={userData.beneficiaryAccountName || ''}
                onChangeText={() => {}}
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
          disabled={!!hasErrors}
          onPress={() =>
            navigation.navigate('review_payment', {
              type: 'bank_payment',
              data: {
                bank: selectedBank,
                account: userData,
                beneficiary: saveBeneficiary,
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
