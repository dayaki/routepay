import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Green, Header, Primary, RegularText, TitleText } from '@common';
import { useAppDispatch, useAppSelector } from '@store';
import { apiService, nairaFormat, postWalletHistory } from '@utils';
import { useStyles } from './styles';
import moment from 'moment';
import { capitalize } from 'lodash';

const TransactionHistory = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const today = new Date();
      const items = await apiService(postWalletHistory, 'post', {
        externalId: user.phoneNumber,
        fromDate: new Date(new Date().setDate(today.getDate() - 30)),
        toDate: today,
        Limit: 100,
      });
      console.log('items', items);
      setHistory(items);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Transaction History" centered hideBalance />
      <View style={styles.scroll}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={history}
            renderItem={({ item }) => (
              <View style={styles.history}>
                <View style={styles.historyTexts}>
                  <RegularText
                    text={item.narration}
                    style={styles.historyText}
                    numberOfLines={1}
                  />
                  <RegularText
                    text={moment(item.transactionDate).format(
                      'DD MMMM, YYYY, HH:mma',
                    )}
                    style={styles.historyLabel}
                  />
                </View>
                <TitleText
                  text={`${nairaFormat(item.amount)}`}
                  style={styles.historyAmount}
                  color={item.transactionType === 'DEBIT' ? Primary : Green}
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
        )}
      </View>
    </View>
  );
};

export default TransactionHistory;
