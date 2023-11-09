import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, Input, RegularText, TextCounter } from '@common';
import { useStyles } from '../styles';
import { SearchIcon } from '@icons';
import {
  apiService,
  extractAmount,
  formatPhone,
  moneyFormat,
  postVerifyBank,
} from '@utils';
import { useAppSelector } from '@store';

type Account = {
  verificationId: string | null;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  bankCode: string | null;
  bvn: string | null;
};

const Routepay = ({ navigation }) => {
  const { wallet } = useAppSelector(state => state.user);
  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [userData, setUserData] = useState<Account>();
  const [hasError, setHasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleCustomAmount = (figure: string) => {
    setAmount(figure);
    const formatted = moneyFormat(figure, 0);
    setCustomAmount(formatted);
  };

  const validate = () => {
    if (Number(extractAmount(amount)) > wallet.balance) {
      setHasError(
        'Insufficent wallet balance. Topup your wallet to pay with wallet.',
      );
    } else {
      setHasError('');
    }
  };

  // 08038158300
  const accountLookup = async () => {
    if (searchText.length === 11) {
      setIsLoading(true);
      try {
        const response = await apiService(postVerifyBank, 'post', {
          transferType: 'wallet',
          accountNumber: formatPhone(searchText),
          bankCode: '',
        });
        setUserData(response);
        setHasError('');
      } catch (error: any) {
        setHasError(error.title);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onContinue = () => {
    if (Number(extractAmount(amount)) > wallet.balance) {
      setHasError(
        'Insufficent wallet balance. Topup your wallet to pay with wallet.',
      );
    } else {
      navigation.navigate('review_payment', {
        type: 'payment',
        data: {
          account: userData,
          remark: memo || `Payment to ${userData?.beneficiaryAccountNumber}`,
          amount: extractAmount(amount),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Send Money" centered />
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={styles.contentStyle}>
        <View>
          <RegularText
            text="Please provide the details of the Routepay wallet id you would like to send money to below"
            size={14}
            style={styles.pageLabel}
          />
          <Input
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by mobile number"
            onBlur={accountLookup}
            keyboardType="number-pad"
            maxLength={11}
            returnKeyType="done"
            leftIcon={<SearchIcon />}
          />
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="black"
              style={styles.loader}
            />
          )}

          {!isLoading && !!userData && (
            <>
              <Input
                editable
                value={userData.beneficiaryAccountName}
                onChangeText={setAmount}
                placeholder="Account number"
              />
              <Input
                value={customAmount}
                onChangeText={handleCustomAmount}
                placeholder="Amount"
                onBlur={validate}
                keyboardType="number-pad"
                returnKeyType="done"
              />
              <Input
                value={memo}
                onChangeText={setMemo}
                placeholder="Remark"
                rightIcon={<TextCounter text={memo} />}
              />
            </>
          )}

          {!!hasError && !isLoading && (
            <RegularText text={hasError} style={styles.errorText} />
          )}
        </View>
        <Button
          text="Continue"
          disabled={!userData || !amount || !!hasError}
          onPress={onContinue}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Routepay;
