import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, Loader, RegularText, Scanner } from '@common';
import { Exclamation } from '@icons';
import { useStyles } from '../styles';
import { decode } from 'base-64';

const ScanPay = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const onRead = (code: string) => {
    setIsLoading(true);
    console.log('NQR Code READ', code);
    if (code.startsWith('00')) {
      navigation.navigate('review_payment', {
        type: 'scan',
        data: {
          merchant: code.slice(154, 154 + 13),
          merchant_sub: code.slice(78, 78 + 11),
          amount: code.slice(142, 142 + 2),
          payment_type: 'NIBSS',
        },
      });
    } else {
      const codeData = decode(code);
      console.log('codedata', codeData);
      navigation.navigate('scan_review', {
        data: {
          wallet_id: codeData.slice(4, 4 + 11),
          name: codeData.slice(15),
          payment_type: 'RoutePay',
        },
      });
    }
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
