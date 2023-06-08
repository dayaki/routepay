import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Input, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { Exclamation } from '@icons';
import { nairaFormat } from '@utils';

const ScanReview = ({ navigation, route }) => {
  const data = route.params.data || null;
  const [amount, setAmount] = useState('');
  const styles = useStyles();

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
            disabled={!amount}
            text="Continue payment"
            onPress={() =>
              navigation.navigate('payment_options', { data, type: 'scan' })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ScanReview;
