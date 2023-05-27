import React from 'react';
import { View } from 'react-native';
import { Header, RegularText, Scanner } from '@common';
import { Exclamation } from '@icons';
import { useStyles } from '../styles';

const ScanPay = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Scan to Pay" centered hideBalance />
      <View style={styles.content}>
        <Scanner />
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
