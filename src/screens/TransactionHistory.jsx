import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Header, Primary, RegularText, TitleText } from '@common';
import { nairaFormat } from '@utils';
import { useStyles } from '../screens/wallet/styles';
import moment from 'moment';

const TransactionHistory = ({ navigation, route }) => {
  const { transactions } = route.params;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Transaction History" centered hideBalance />
      <View style={styles.scroll}>
        <FlashList
          showsVerticalScrollIndicator={false}
          data={transactions}
          renderItem={({ item }) => (
            <View style={styles.history}>
              <View style={styles.historyTexts}>
                <RegularText text={item.billCode} style={styles.historyText} />
                <RegularText
                  text={moment(item.created).format('DD MMMM, YYYY, HH:MMa')}
                  style={styles.historyLabel}
                />
              </View>
              <TitleText
                text={`${nairaFormat(item.amount)}`}
                style={styles.historyAmount}
                color={Primary}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <RegularText
              text="You do not have any transaction history"
              style={styles.nothing}
            />
          )}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default TransactionHistory;
