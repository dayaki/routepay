import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, Input, RegularText, TextCounter } from '@common';
import { useStyles } from '../styles';
import { SearchIcon } from '@icons';
import { apiService, formatPhone, postVerifyBank } from '@utils';

type Account = {
  verificationId: string | null;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  bankCode: string | null;
  bvn: string | null;
};

const Routepay = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [userData, setUserData] = useState<Account>();
  const [hasError, setHasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

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
          {!!hasError && !isLoading && (
            <RegularText text={hasError} style={styles.errorText} />
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
                value={amount}
                onChangeText={setAmount}
                placeholder="Amount"
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
        </View>
        <Button
          text="Continue"
          disabled={!userData || !memo || !amount}
          onPress={() =>
            navigation.navigate('review_payment', {
              type: 'payment',
              data: {
                account: userData,
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

export default Routepay;
