import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, Loader, RegularText, Scanner } from '@common';
import { Exclamation } from '@icons';
import { useStyles } from '../styles';
import { decode } from 'base-64';

const indexCount = (stringData: string, num: string) => {
  const index = stringData.indexOf(num) + 2;
  const count = Number(stringData.substring(index, index + 2));
  return { index, count };
};

const ScanPay = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const onRead = (code: string) => {
    setIsLoading(true);
    console.log('NQR Code READ', code);
    // NIBSS QRcode
    if (code.startsWith('00')) {
      let merchantData = indexCount(code, '59');
      let amountData = indexCount(code, '54');
      const merchantName = code.substring(
        merchantData.index + 2,
        merchantData.index + (merchantData.count + 2),
      );
      const amount = code.substring(
        amountData.index + 2,
        amountData.index + (amountData.count + 2),
      );
      navigation.navigate('review_payment', {
        type: 'scan',
        data: {
          merchant: merchantName,
          merchant_sub: code.slice(78, 78 + 11),
          amount: amount,
          payment_type: 'NIBSS',
        },
      });
    }
    // RoutePay QRcode
    else {
      const codeData = decode(code);
      console.log('codedata', codeData);
      navigation.navigate('scan_review', {
        data: {
          wallet_id: codeData.slice(4, 4 + 13),
          name: codeData.slice(17),
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
