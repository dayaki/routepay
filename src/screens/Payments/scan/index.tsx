import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, Loader, RegularText, Scanner } from '@common';
import { Exclamation } from '@icons';
import { useStyles } from '../styles';

const ScanPay = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const onRead = (code: string) => {
    setIsLoading(true);
    console.log('NQR Code READ', code);
    // const payload = {
    //   billCode: selectedNetwork?.billCode,
    //   merchantReference: getUniqueID(),
    //   payload: {
    //     mobileNumber: phone,
    //     amount: amount,
    //   },
    // };
    // dispatch(updateOrder(payload));
    setIsLoading(false);
    navigation.navigate('review_payment', {
      type: 'scan',
      data: {
        merchant: code.slice(154, 154 + 13),
        merchant_sub: code.slice(78, 78 + 11),
        amount: code.slice(142, 142 + 2),
        payment_type: code.startsWith('00') ? 'NIBSS' : 'RoutePay',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Loader show={isLoading} />
      <Header title="Scan to Pay" centered hideBalance />
      <View style={styles.content}>
        <Scanner onDone={onRead} />
        <View style={styles.reviewInfo}>
          <Exclamation />
          <RegularText
            text="Please ensure the QR code fits into the scan area"
            size={14}
            style={styles.reviewInfoText}
          />
        </View>
      </View>
    </View>
  );
};
export default ScanPay;
