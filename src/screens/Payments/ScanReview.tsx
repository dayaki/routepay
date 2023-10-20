import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Header,
  Input,
  RegularText,
  TextCounter,
  TitleText,
} from '@common';
import { useStyles } from './styles';
import { Exclamation } from '@icons';
import { apiService, nairaFormat, postVerifyBank } from '@utils';

type Account = {
  verificationId: string | null;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  bankCode: string | null;
  bvn: string | null;
};

const ScanReview = ({ navigation, route }) => {
  const data = route.params.data || null;
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [userData, setUserData] = useState<Account>();
  const [hasError, setHasError] = useState('');
  const styles = useStyles();

  useEffect(() => {
    accountLookup();
  }, [data]);

  const accountLookup = async () => {
    try {
      const response = await apiService(postVerifyBank, 'post', {
        transferType: 'wallet',
        accountNumber: data.wallet_id,
        bankCode: '',
      });
      setUserData(response);
      setHasError('');
    } catch (error: any) {
      setHasError(error.title);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Review Payment" centered hideBalance />
      <View style={styles.content}>
        <View>
          <View style={styles.review}>
            <View style={styles.reviewItem}>
              <RegularText text="Beneficiary Wallet" size={14} />
              <TitleText text={data.wallet_id} size={14} />
            </View>
            <View style={styles.reviewItem}>
              <RegularText text="Beneficiary Name" size={14} />
              <TitleText text={data.name} size={14} />
            </View>
            <View style={styles.reviewItem}>
              <RegularText text="Payment Type" size={14} />
              <TitleText text="ROUTEPAY" size={14} />
            </View>
            <View style={styles.reviewItem}>
              <RegularText text="Amount" size={14} />
              <TitleText text={nairaFormat(Number(amount))} size={14} />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Input
              placeholder="Enter amount"
              label="Amount"
              value={amount}
              keyboardType="number-pad"
              onChangeText={setAmount}
              returnKeyType="done"
            />
            <Input
              value={memo}
              onChangeText={setMemo}
              placeholder="Remark"
              rightIcon={<TextCounter text={memo} />}
            />
          </View>
        </View>

        <View>
          <View style={styles.reviewInfo}>
            <Exclamation />
            <RegularText
              text="Kindly review the payment details before continuing your transaction."
              size={14}
              style={styles.reviewInfoText}
            />
          </View>
          <Button
            disabled={!amount || !memo}
            text="Continue payment"
            onPress={() =>
              navigation.navigate('wallet_pin', {
                data: {
                  account: userData,
                  remark: memo,
                  amount,
                },
                type: 'payment',
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ScanReview;
