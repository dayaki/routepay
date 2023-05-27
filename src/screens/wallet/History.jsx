import React from 'react';
import { ScrollView, View } from 'react-native';
import { Green, Header, Primary, RegularText, TitleText } from '@common';
import { useAppSelector } from '@store';
import { nairaFormat } from '@utils';
import { useStyles } from './styles';

const TransactionHistory = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Transaction History" centered hideBalance />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.history}>
          <View style={styles.historyTexts}>
            <RegularText
              text="Your Airtime Topup of N100.00 has been received by 081233456789"
              style={styles.historyText}
            />
            <RegularText
              text="12 May, 2023, 09:15pm"
              style={styles.historyLabel}
            />
          </View>
          <TitleText
            text={`-${nairaFormat(145)}`}
            style={styles.historyAmount}
            color={Primary}
          />
        </View>

        <View style={styles.history}>
          <View style={styles.historyTexts}>
            <RegularText
              text="Wallet top-up from Ayodeji Subair"
              style={styles.historyText}
            />
            <RegularText
              text="12 May, 2023, 09:15pm"
              style={styles.historyLabel}
            />
          </View>
          <TitleText
            text={`+${nairaFormat(500)}`}
            style={styles.historyAmount}
            color={Green}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;
